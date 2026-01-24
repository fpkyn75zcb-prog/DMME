export async function onRequest({ params }) {
  const roomId = params.roomId;

return new Response(`
    `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>DM ME – Room</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body class="room">
  <div class="room-header">
  <input
  id="roomName"

  placeholder="Click to name room"
  onkeydown="if(event.key==='Enter'){saveRoomName()}"
/>

    <button id="copyLinkBtn" class="copy-btn" onclick="copyLink()">Copy Link</button>
<p id="copyStatus"></p>

  </div>

  <div class="chat-container" id="chat"></div>

<div class="chat-input">
  <input
    id="messageInput"
    class="message-input"
    placeholder="Type a message..."
    autocomplete="off"
  />
  <button id="sendBtn" class="send-btn" type="button">Send</button>
</div>

<script>

  <input id="messageInput" placeholder="Type a message..." />
  <button id="sendBtn" type="button">Send</button>
</div>

</script>

<script>
  const input = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const chat = document.getElementById("chat");

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const msg = document.createElement("div");
    msg.textContent = text;
    chat.appendChild(msg);
    input.value = "";
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });
</script>


</body>
</html>
`, {
  headers: { "Content-Type": "text/html" }
});
}

