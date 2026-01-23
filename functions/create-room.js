export async function onRequestPost() {
  const roomId = crypto.randomUUID();

  return new Response(
    JSON.stringify({ roomId }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    }
  );
}
