export async function onRequest({ params }) {
  const roomId = params.roomId;

  return new Response(
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DM ME – Room</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body class="room">
  <div class="room-header">
    <h2 class="room-title">Room</h2>
    <span class="room-id">${roomId}</span>
    <span class="timer">24:00:00</span>
  </div>

  <div class="chat-container">
    <p>This room is live.</p>
  </div>

  <form class="chat-form">
    <input
      type="text"
      class="message-input"
      placeholder="Type a message…"
      disabled
    />
    <button class="send-btn" disabled>Send</button>
  </form>
</body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-store"
      }
    }
  );
}
