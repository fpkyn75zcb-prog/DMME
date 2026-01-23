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
    <h1 class="room-title">Room ID</h1>
    <button class="copy-btn" onclick="navigator.clipboard.writeText(window.location.href)">
      Copy Link
    </button>
  </div>

  <div class="chat-container">
    <p><strong>${roomId}</strong></p>
    https://dmme.pages.dev/room/069380a3-2330-4bef-a729-35a62714923c    <button onclick="copyLink()" class="primary-btn">Copy Room Link</button>
    <p id="copyStatus"></p>
  </div>
  <script>
  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    document.getElementById('copyStatus').textContent = 'Link copied!';
  }
</script>
https://dmme.pages.dev/room/069380a3-2330-4bef-a729-35a62714923c
</body>
</html>
    `,
    {
      headers: { "Content-Type": "text/html" }
    }
  );
}
