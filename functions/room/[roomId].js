export async function onRequest() {
  return new Response(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Chat Room</title>
  <style>
    body {
      margin: 0;
      background: #0b0b12;
      color: #fff;
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .chat-container {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
    }
    .chat-message {
      margin-bottom: 8px;
      padding: 8px 12px;
      background: #1f1f2e;
      border-radius: 6px;
      width: fit-content;
      max-width: 80%;
    }
    .chat-input {
      display: flex;
      border-top: 1px solid #333;
    }
    .chat-input input {
      flex: 1;
      padding: 12px;
      border: none;
      outline: none;
      font-size: 16px;
    }
    .chat-input button {
      padding: 0 16px;
      background: #3b82f6;
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }
  </style>
</head>
<body>
<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:#0f172a;">
  <input
    id="roomName"
    placeholder="Room name"
    style="background:transparent;border:none;color:#fff;font-size:16px;outline:none;"
  />
  <button
    onclick="copyLink()"
    style="background:#3b82f6;color:#fff;border:none;padding:6px 10px;cursor:pointer;"
  >
    Copy Link
  </button>
</div>


  <div class="chat-container" id="chat"></div>

  <div class="chat-input">
    <input id="messageInput" placeholder="Type a message..." />
    <button id="sendBtn" type="button">Send</button>
  </div>

  <script>
    const input = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const chat = document.getElementById("chat");

    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      const msg = document.createElement("div");
      msg.className = "chat-message";
      msg.textContent = text;
      chat.appendChild(msg);

      input.value = "";
      chat.scrollTop = chat.scrollHeight;
    }

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
    function copyLink() {
  navigator.clipboard.writeText(window.location.href);
}

  </script>

</body>
</html>
`, {
    headers: { "Content-Type": "text/html" }
  });
}
