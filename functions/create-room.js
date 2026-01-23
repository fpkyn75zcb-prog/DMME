export async function onRequestPost() {
  const roomId = crypto.randomUUID();

  return new Response(
    JSON.stringify({ roomId }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
}
