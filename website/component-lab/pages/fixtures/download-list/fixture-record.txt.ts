export function GET(): Response {
  return new Response("Component-lab source record fixture.\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
