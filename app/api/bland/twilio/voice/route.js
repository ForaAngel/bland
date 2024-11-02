export async function POST(req) {
  try {
    // Obtener los datos de la solicitud como texto y parsearlo
    const body = await req.text();
    const params = new URLSearchParams(body);
    const to = params.get("To");
    const from = params.get("From");

    console.log("Llamada entrante:", { to, from });

    // Generar TwiML response con los headers correctos
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Say language="es-MX" voice="Polly.Lupe">
          Bienvenido a nuestro hotel. Un momento por favor.
        </Say>
        <Pause length="1"/>
        <Redirect method="POST">${process.env.NEXT_PUBLIC_APP_URL}/api/bland/inbound</Redirect>
      </Response>`;

    return new Response(twiml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Voice URL Error:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
        <Response>
          <Say language="es-MX">Lo sentimos, ha ocurrido un error.</Say>
        </Response>`,
      {
        headers: {
          "Content-Type": "application/xml",
        },
        status: 500,
      }
    );
  }
}
