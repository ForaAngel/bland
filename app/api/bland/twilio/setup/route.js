import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Business from "@/models/Business";
import { hotelReceptionistConfig } from "../../agent/config";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { phoneNumber } = await req.json();

    // 1. Obtener llave encriptada de Bland
    const encryptResponse = await fetch(
      "https://api.bland.ai/v1/enterprise/twilio/encrypt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: process.env.BLAND_API_KEY,
        },
        body: JSON.stringify({
          account_sid: process.env.TWILIO_ACCOUNT_SID,
          auth_token: process.env.TWILIO_AUTH_TOKEN,
        }),
      }
    );

    const { encrypted_key } = await encryptResponse.json();

    // 2. Configurar el número en Bland AI
    const configResponse = await fetch(
      `https://api.bland.ai/v1/inbound/${phoneNumber}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: process.env.BLAND_API_KEY,
          encrypted_key: encrypted_key,
        },
        body: JSON.stringify({
          ...hotelReceptionistConfig,
          webhook: `https://bland-three.vercel.app/api/bland/webhook`,
          voice_webhook: `https://bland-three.vercel.app/api/bland/inbound`,
          voice_url: `https://bland-three.vercel.app/api/bland/twilio/voice`,
          record: true,
          reduce_latency: true,
          wait_for_greeting: false,
          voice: "adriana",
          language: "ESP",
          model: "enhanced",
          amd: false,
          interruption_threshold: 150,
        }),
      }
    );

    if (!configResponse.ok) {
      const errorData = await configResponse.json();
      console.error("Bland API Error:", errorData);
      throw new Error("Error configuring number with Bland AI");
    }

    // 3. Guardar en la base de datos
    await connectMongo();
    await Business.findOneAndUpdate(
      { userId: session.user.id },
      {
        twilioNumber: phoneNumber,
        twilioEncryptedKey: encrypted_key,
        twilioConfigured: true,
      },
      { new: true }
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error setting up Twilio:", error);
    return Response.json(
      { error: "Error configuring Twilio: " + error.message },
      { status: 500 }
    );
  }
}
