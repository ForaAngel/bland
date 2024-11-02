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
          task: "Eres un recepcionista de hotel profesional. Ayuda al cliente con sus consultas.",
          webhook: `${process.env.NEXT_PUBLIC_APP_URL}/api/bland/webhook`,
          voice_webhook: `${process.env.NEXT_PUBLIC_APP_URL}/api/bland/inbound`,
          voice_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/bland/twilio/voice`,
          dynamic_data: [
            {
              ...hotelReceptionistConfig.dynamic_data[0],
              url: `${process.env.NEXT_PUBLIC_APP_URL}/api/bland/business/{{request_data.businessId}}`,
            },
          ],
          record: true,
          reduce_latency: true,
          wait_for_greeting: false,
          voice: "adriana",
          language: "ESP",
          model: "enhanced",
          amd: false,
          interruption_threshold: 150,
          transfer_phone_number: process.env.FALLBACK_PHONE_NUMBER,
          retry: {
            max_retries: 2,
            delay_minutes: 5,
          },
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
