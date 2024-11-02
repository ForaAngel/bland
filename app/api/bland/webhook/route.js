import connectMongo from "@/libs/mongoose";
import Business from "@/models/Business";

export async function POST(req) {
  try {
    const data = await req.json();
    const { call_id, status, to_number, from_number, duration, transcript } =
      data;

    // Guardar el registro de la llamada
    await connectMongo();
    const business = await Business.findOne({ phone: to_number });

    if (business) {
      // Aquí podrías guardar el registro de la llamada en tu base de datos
      console.log(`Call received for ${business.hotelName}`);
      console.log(`Status: ${status}, Duration: ${duration}`);
      console.log(`Transcript: ${transcript}`);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return Response.json(
      { error: "Error processing webhook" },
      { status: 500 }
    );
  }
}
