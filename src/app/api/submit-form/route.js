import { connectToDatabase } from "@/lib/mongodb";
import FormModel from "@/models/Form";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const saved = await FormModel.create(body);
    return new Response(JSON.stringify(saved), { status: 200 });
  } catch (err) {
    console.error("❌ Error in /api/submit-form:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
