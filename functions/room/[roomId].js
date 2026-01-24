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

  <div class="chat-container">
    </div>
    
 <div class="chat-input">
  <input
    id="messageInput"
    class="message-input"
    placeholder="Type a message..."
  />
  <button id="sendBtn" class="send-btn">Send</button>
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const chat = document.querySelector(".chat-container");

  function sendMessage() {
    if (!input.value.trim()) return;

    const msg = document.createElement("div");
    msg.className = "chat-message self";
    msg.textContent = input.value;

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
    input.value = "";
  }

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
  });
</script>
</body>
</html>
`, {
  headers: { "Content-Type": "text/html" }
});
}

