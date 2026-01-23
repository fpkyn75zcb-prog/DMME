export async function onRequest(context) {
  const url = new URL(context.request.url);

  // If someone is on the homepage, let Pages handle it
  if (url.pathname === "/") {
    return context.next();
  }

  // Everything else goes to the Worker
  return context.env.WORKER.fetch(context.request);
}
