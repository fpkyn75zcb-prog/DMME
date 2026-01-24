export async function onRequest({ params }) {
  const roomId = params.roomId;

  return new Response(
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
  <script>
  navigator.clipboard.writeText(window.location.href);

const status = document.getElementById("copyStatus");
status.textContent = "Link copied";

setTimeout(() => {
  status.textContent = "";
}, 1500);


  

  setTimeout(() => {
    status.style.opacity = '0';
    status.textContent = '';
  }, 1500);
}
<script>
function copyLink() {
  navigator.clipboard.writeText(window.location.href);

  const status = document.getElementById("copystatus");
  status.textContent = "Link copied!";
  status.style.opacity = "1";

  setTimeout(() => {
    status.style.opacity = "0";
  }, 2000);
}
<script>
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.onclick = () => {
  if (!input.value) return;

  const msg = document.createElement("div");
  msg.textContent = input.value;
  msg.style.padding = "8px";
  msg.style.margin = "4px";
  msg.style.background = "#222";
  msg.style.color = "#fff";

  document.body.appendChild(msg);
  input.value = "";
};
</script>
<script>
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.onclick = () => {
  if (!input.value.trim()) return;

  const msg = document.createElement("div");
  msg.className = "chat-message self";
  msg.textContent = input.value;

  document.querySelector(".chat-container").appendChild(msg);
  input.value = "";
};
</script>

</script>
<div class="chat-input">
  <input
    id="messageInput"
    class="message-input"
    placeholder="Type a message..."
  />
  <button id="sendBtn" class="send-btn">Send</button>
</div>

</html>
    `,
    {
      headers: { "Content-Type": "text/html" }
    }
  );
}
