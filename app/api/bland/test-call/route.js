import { hotelReceptionistConfig } from "@/app/api/bland/agent/config";
import connectMongo from "@/libs/mongoose";
import Business from "@/models/Business";

export async function POST(req) {
  try {
    const { phoneNumber, businessId } = await req.json();

    if (!phoneNumber || !businessId) {
      return Response.json(
        { error: "Phone number and business ID are required" },
        { status: 400 }
      );
    }

    await connectMongo();
    const business = await Business.findById(businessId);

    if (!business) {
      return Response.json({ error: "Business not found" }, { status: 404 });
    }

    // Asegurar que la URL sea HTTPS
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL.replace(
      "http://",
      "https://"
    );

    // Configuración de la llamada de prueba
    const callData = {
      phone_number: phoneNumber,
      task: "Eres un recepcionista de hotel profesional. Ayuda al cliente con sus consultas.",
      prompt: hotelReceptionistConfig.prompt,
      voice: "adriana",
      language: "ESP",
      model: "enhanced",
      record: true,
      reduce_latency: true,
      request_data: {
        businessId: businessId,
      },
      dynamic_data: [
        {
          url: `${baseUrl}/api/bland/business/${businessId}`,
          method: "GET",
          headers: {
            authorization: process.env.BLAND_API_KEY,
          },
          response_data: [
            {
              name: "hotel_name",
              data: "$.hotelName",
              context: "Nombre del hotel: {{hotel_name}}",
            },
          ],
        },
      ],
      webhook: `${baseUrl}/api/bland/webhook`,
      max_duration: 300,
      wait_for_greeting: false,
    };

    // Hacer la llamada a la API de Bland
    const blandResponse = await fetch("https://api.bland.ai/v1/calls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: process.env.BLAND_API_KEY,
      },
      body: JSON.stringify(callData),
    });

    const responseData = await blandResponse.json();

    if (!blandResponse.ok) {
      console.error("Bland API Error:", responseData);
      return Response.json(
        {
          error:
            "Error initiating call with Bland AI: " +
            JSON.stringify(responseData),
        },
        { status: blandResponse.status }
      );
    }

    return Response.json({
      message: "Test call initiated successfully",
      callId: responseData.call_id,
      status: responseData.status,
    });
  } catch (error) {
    console.error("Test Call Error:", error);
    return Response.json(
      { error: "Error processing test call request" },
      { status: 500 }
    );
  }
}
