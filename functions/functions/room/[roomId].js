export async function onRequest({ params }) {
  const { roomId } = params;

  return new Response(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>DM ME Room</title>
      </head>
      <body>
        <h1>Room ${roomId}</h1>
        <p>This room will expire in 24 hours.</p>
      </body>
    </html>
    `,
    { headers: { "Content-Type": "text/html" } }
  );
}
