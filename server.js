const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

/*
 * DM ME – Disposable chat rooms
 *
 * This server implements a minimal backend for creating temporary chat rooms.
 * Each room costs $2 to create (payment processing should be integrated
 * separately via a provider such as Stripe). For demonstration purposes
 * this implementation simply creates a room when the `/create-room` endpoint
 * is hit without charging a real payment. The room is removed 24 hours
 * after creation. A simple in‑memory data structure stores active rooms
 * and their messages while alive.
 */

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Store active rooms keyed by their token. Each room holds its creation
// timestamp and an array of messages. Messages are not persisted once
// the room expires.
const rooms = {};

// Serve static assets from the `public` folder
app.use(express.json());

/**
 * POST /create-room
 *
 * This endpoint should be invoked after a successful payment. It creates a
 * unique room token, registers the room in memory, schedules its removal
 * after 24 hours and returns the URL and expiry timestamp. In a real
 * deployment you would integrate your payment provider here before
 * provisioning the room.
 */
app.post('/create-room', (req, res) => {
  // In a production implementation, validate payment status here.

  // Generate a unique room token
  const token = uuidv4();
  const createdAt = Date.now();
  rooms[token] = { createdAt, messages: [] };
  // Schedule deletion after 24 hours (86,400,000 milliseconds)
  setTimeout(() => {
    delete rooms[token];
  }, 24 * 60 * 60 * 1000);

  res.json({
    roomUrl: `/room/${token}`,
    token,
    expiresAt: createdAt + 24 * 60 * 60 * 1000
  });
});

/**
 * GET /
 *
 * Landing page. Returns the static index.html file.
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

/**
 * GET /room/:token
 *
 * Serves the chat room UI if the room exists and has not expired. If the
 * room is missing, a 404 is returned. The actual chat logic is handled
 * client‑side via Socket.IO.
 */
app.get('/room/:token', (req, res) => {
  const { token } = req.params;
  const room = rooms[token];
  if (!room) {
    return res.status(404).send('Room not found or expired.');
  }
  res.sendFile(path.join(__dirname, 'public/room.html'));
});

/**
 * GET /api/room/:token
 *
 * Provides metadata about a room (its creation and expiry) for the front
 * end to display a countdown timer. Returns 404 if the room does not exist.
 */
app.get('/api/room/:token', (req, res) => {
  const { token } = req.params;
  const room = rooms[token];
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  res.json({
    createdAt: room.createdAt,
    expiresAt: room.createdAt + 24 * 60 * 60 * 1000
  });
});

/**
 * Socket.IO connection handler.
 *
 * Clients emit `joinRoom` when they first load the chat UI. If the room is
 * valid, the server joins them to a Socket.IO room with the same token and
 * sends any existing messages. Messages are relayed to all connected
 * participants via `newMessage`. If a room has expired, the client is
 * notified via `roomExpired`.
 */
io.on('connection', (socket) => {
  // When a client joins a room
  socket.on('joinRoom', (token) => {
    const room = rooms[token];
    if (!room) {
      socket.emit('roomExpired');
      return;
    }
    socket.join(token);
    // Send all existing messages to the newly joined client
    socket.emit('initMessages', room.messages);
  });

  // When a message is sent from a client
  socket.on('sendMessage', (data) => {
    const { token, message } = data;
    const room = rooms[token];
    if (!room) {
      socket.emit('roomExpired');
      return;
    }
    const msgObj = { text: message, timestamp: Date.now() };
    room.messages.push(msgObj);
    io.to(token).emit('newMessage', msgObj);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`DM ME server running on http://localhost:${PORT}`);
});
