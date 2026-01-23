export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Let homepage load
  if (url.pathname === "/") {
    return context.next();
  }

  // Let room pages load
  if (url.pathname.startsWith("/room/")) {
    return context.next();
  }

  // Everything else goes to Worker
  return context.env.WORKER.fetch(context.request);
}
