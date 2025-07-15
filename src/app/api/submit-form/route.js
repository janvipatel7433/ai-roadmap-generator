import { connectToDatabase } from "@/lib/mongodb";
import FormModel from "@/models/Form";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();

    // Update if email exists, otherwise insert
    const saved = await FormModel.findOneAndUpdate(
      { email: body.email },    // Match by email
      { $set: body },           // Update fields
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return new Response(JSON.stringify(saved), { status: 200 });
  } catch (err) {
    console.error("❌ Error in /api/submit-form:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
