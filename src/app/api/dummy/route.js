export async function GET(req) {
  return Response.json({ message: 'Dummy GET request successful!' });
}

export async function POST(req) {
  const body = await req.json();
  return Response.json({ message: 'Dummy POST request received!', data: body });
}
