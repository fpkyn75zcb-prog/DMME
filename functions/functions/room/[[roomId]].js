export async function onRequestGet({ params }) {
  const roomId = params.roomId;

  return new Response(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>DM ME – Room</title>
        <meta charset="UTF-8" />
      </head>
      <body>
        <h1>Room ID</h1>
        <p>${roomId}</p>
        <p>This room will expire in 24 hours.</p>
      </body>
    </html>
    `,
    {
      headers: { "Content-Type": "text/html" }
    }
  );
}
