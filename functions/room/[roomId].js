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
</script>
<input id="messageInput" placeholder="Type a message…" style="position:fixed; bottom:0; left:0; width:80%; padding:14px; border:none; outline:none;" />
<button id="sendBtn" style="position:fixed; bottom:0; right:0; width:20%; padding:14px; border:none; background:#1e90ff; color:#fff;">Send</button>

</body>
</html>
    `,
    {
      headers: { "Content-Type": "text/html" }
    }
  );
}
