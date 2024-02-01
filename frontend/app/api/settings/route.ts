export async function GET(request: Request, res: Response) {
  const data = {
    TABLE_NAME: process.env.TABLE_NAME,
    REGION: process.env.REGION,
  };
  return Response.json({ data });
}
