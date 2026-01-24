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
  background: linear-gradient(135deg, #ff4fd8, #7b5cff, #1fa2ff);
  color: #fff;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

    
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
  padding: 10px 14px;
  border-radius: 10px;
  max-width: 80%;
  backdrop-filter: blur(6px);
}


   .chat-input {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  background: #000000;
  padding: 0 12px;
  box-sizing: border-box;
}

.chat-input input::placeholder {
  color: #9a9a9a;
}


    }
.chat-input input {
  flex: 1;
  height: 100%;

  background: #000000;
  color: #b0b0b0;

  border: none;
  outline: none;

  font-size: 16px;
  padding: 0 12px;
}




}

    ..chat-input button {
  height: 40px;
  margin-left: 12px;
  padding: 0 16px;
  background: #3b82f6;
  color: #ffffff;
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
  alert("Room link copied");
}


  </script>

</body>
</html>
`, {
    headers: { "Content-Type": "text/html" }
  });
}
