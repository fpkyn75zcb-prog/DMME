export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Allow homepage
  if (url.pathname === "/") {
    return context.next();
  }

  // Allow create-room endpoint
  if (url.pathname === "/create-room") {
    return context.next();
  }

  // Allow room pages
  if (url.pathname.startsWith("/room/")) {
    return context.next();
  }

  // Everything else goes to Worker
  return context.env.WORKER.fetch(context.request);
}

