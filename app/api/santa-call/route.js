import { NextResponse } from "next/server";

// Aumentar el tiempo de timeout para esta ruta
export const maxDuration = 60; // 60 segundos
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const BLAND_API_KEY = process.env.BLAND_API_KEY;
const BLAND_API_URL = "https://api.bland.ai/v1/calls";

export async function POST(req) {
  if (!BLAND_API_KEY) {
    console.error("Error: BLAND_API_KEY no está configurada");
    return NextResponse.json(
      { error: "Error de configuración del servidor" },
      { status: 500 }
    );
  }

  try {
    const data = await req.json();
    console.log("Datos recibidos:", data);

    if (!data.phone_number) {
      return NextResponse.json(
        { error: "Número de teléfono requerido" },
        { status: 400 }
      );
    }

    // Formatear el número de teléfono al formato E.164
    let formattedPhone = data.phone_number.replace(/\D/g, "");
    if (!formattedPhone.startsWith("52")) {
      formattedPhone = "52" + formattedPhone;
    }
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+" + formattedPhone;
    }

    const blandData = {
      phone_number: formattedPhone,
      task: `You are Santa Claus making a special Christmas call to ${data.childName}. 
             Important details:
             - Age: ${data.age} years old
             - Behavior this year: ${data.behavior}
             - Favorite color: ${data.favoriteColor}
             - Favorite hobby: ${data.favoriteHobby}
             - Wish list: ${data.wishList}
             - Special message: ${data.specialMessage}
             
             Guidelines:
             - Be warm, jolly, and magical
             - Use Spanish phrases and holiday greetings
             - Show interest in their hobbies and wishes
             - Never promise specific gifts
             - Keep the magic of Christmas alive
             - End with encouragement and holiday cheer`,
      voice: "mason",
      first_sentence: "¡Jo jo jo! ¿Hablo con " + data.childName + "?",
      language: "ESP",
      max_duration: 5,
      model: "enhanced",
      reduce_latency: true,
      wait_for_greeting: true,
      metadata: {
        call_type: "santa_call",
        child_name: data.childName,
        child_age: data.age,
      },
    };

    // Agregar timeout a la petición fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000); // 50 segundos

    const response = await fetch(BLAND_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: BLAND_API_KEY,
      },
      body: JSON.stringify(blandData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const result = await response.json();
    console.log("Respuesta de Bland:", result);

    if (!response.ok) {
      throw new Error(result.message || "Error en la API de Bland");
    }

    return NextResponse.json({
      success: true,
      callId: result.call_id,
    });
  } catch (error) {
    console.error("Error detallado:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    if (error.name === "AbortError") {
      return NextResponse.json(
        { error: "La llamada tomó demasiado tiempo en completarse" },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Error al procesar la llamada de Santa" },
      { status: 500 }
    );
  }
}
