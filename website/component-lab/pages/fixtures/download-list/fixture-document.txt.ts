export function GET(): Response {
  return new Response("Component-lab download fixture.\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
