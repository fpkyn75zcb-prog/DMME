export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.pathname === "/") {
    return context.next();
  }

  return context.env.WORKER.fetch(context.request);
}
