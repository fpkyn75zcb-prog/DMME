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


  const status = document.getElementById('copyStatus');
  status.textContent = 'Link copied';
  status.style.opacity = '1';

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
</body>
</html>
    `,
    {
      headers: { "Content-Type": "text/html" }
    }
  );
}
