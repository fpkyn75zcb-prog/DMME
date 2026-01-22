// Real‑time chat client for DM Me using Gun.js
//
// This script uses the decentralized Gun database to synchronize messages
// across all devices in real time without requiring a backend server or
// user authentication. Each visitor is assigned a simple numeric ID
// (persisted in localStorage) for identification. Messages older than
// 24 hours are automatically purged from the database.

(function () {
  // Assign a persistent user ID
  const userIdKey = 'dm-me-user-id';
  let userId = localStorage.getItem(userIdKey);
  if (!userId) {
    userId = Math.floor(1000 + Math.random() * 9000).toString();
    localStorage.setItem(userIdKey, userId);
  }

  // DOM references
  const messageArea = document.getElementById('messageArea');
  const chatForm = document.getElementById('chatForm');
  const messageInput = document.getElementById('messageInput');

  // Keep track of message IDs we have rendered to avoid duplicates
  const renderedIds = new Set();

  /**
   * Render a chat message to the UI. Plays a notification sound
   * for messages not authored by the current user.
   * @param {object} msg
   */
  function renderMessage(msg) {
    if (renderedIds.has(msg.id)) {
      return;
    }
    renderedIds.add(msg.id);
    const div = document.createElement('div');
    div.classList.add('message');
    if (msg.user && msg.user === userId) {
      div.classList.add('my-message');
    } else {
      div.classList.add('their-message');
    }
    const userSpan = document.createElement('span');
    userSpan.classList.add('user-id');
    userSpan.textContent = 'User ' + (msg.user || '');
    const textSpan = document.createElement('span');
    textSpan.classList.add('message-text');
    textSpan.textContent = msg.text;
    div.appendChild(userSpan);
    div.appendChild(textSpan);
    messageArea.appendChild(div);
    // Play a beep for messages not authored by this user
    if (msg.user !== userId) {
      beep();
    }
    scrollToBottom();
  }

  /**
   * Scroll the message area to the bottom.
   */
  function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
  }

  /**
   * Emit a simple beep tone for notifications.
   */
  function beep() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (err) {
      // ignore audio errors
    }
  }

  /**
   * Send a chat message to the Gun database.
   * @param {string} text
   */
  function sendChat(text) {
    const msg = { user: userId, text: text, timestamp: Date.now() };
    gun.get(room).set(msg);
  }

  // Initialize Gun and define a room key. Gun automatically connects to
  // publicly available relay peers (e.g. gun-manhattan.herokuapp.com) when
  // no peers are specified. This provides free, decentralized data sync
  // without any sign‑up or authentication.
  const gun = Gun();
  const room = 'dmme-chat-room';

  // Listen for incoming messages on the room. Gun stores each message
  // under a unique key. We filter out messages older than 24 hours and
  // remove them from the database to enforce auto‑deletion. Messages are
  // rendered only once using the renderedIds set.
  gun.get(room).map().on(function (msg, id) {
    if (!msg || !msg.text) return;
    const age = Date.now() - (msg.timestamp || 0);
    const TTL = 24 * 60 * 60 * 1000; // 24 hours in ms
    if (age > TTL) {
      // Delete expired message from Gun
      gun.get(room).get(id).put(null);
      return;
    }
    // Assign the message ID for deduping
    msg.id = id;
    renderMessage(msg);
  });

  // Wire up the chat form
  if (chatForm && messageInput) {
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const text = messageInput.value.trim();
      if (!text) return;
      sendChat(text);
      messageInput.value = '';
    });
  }
})();