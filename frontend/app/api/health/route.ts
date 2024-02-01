export async function GET(request: Request, res: Response) {
  return Response.json({ ok: Date.now().toString() });
}
