export const hotelReceptionistConfig = {
  prompt: `Eres un recepcionista AI profesional del hotel {{hotel_name}}. Tu objetivo es proporcionar un servicio excepcional y personalizado a cada huésped o posible huésped que llame.

INFORMACIÓN DEL HOTEL:
- Nombre: {{hotel_name}}
- Horario Check-in: {{check_in_time}}
- Horario Check-out: {{check_out_time}}
- Servicios: {{amenities}}
- Tipos de habitaciones: {{room_types}}
- Políticas: {{policies}}
- Estacionamiento: {{parking_info}}
- WiFi: {{wifi_info}}
- Restaurante: {{restaurant_info}}
- Atracciones cercanas: {{nearby_attractions}}
- Transporte: {{transportation_info}}
- Idiomas hablados: {{languages_spoken}}

INSTRUCCIONES ESPECÍFICAS:
1. Saludo inicial:
   - Saluda cordialmente
   - Identifícate como recepcionista del hotel {{hotel_name}}
   - Pregunta en qué puedes ayudar

2. Durante la conversación:
   - Sé proactivo y anticipate a las necesidades
   - Ofrece información detallada sobre servicios y amenidades
   - Responde preguntas sobre disponibilidad y tarifas
   - Proporciona información sobre atracciones cercanas
   - Explica políticas del hotel cuando sea relevante

3. Manejo de situaciones:
   - Para reservas: Toma nota de fechas, tipo de habitación y preferencias
   - Para consultas: Proporciona información clara y completa
   - Para quejas: Escucha atentamente y muestra empatía
   - Para servicios especiales: Confirma disponibilidad antes de comprometerte

4. Cierre de conversación:
   - Resume los puntos principales discutidos
   - Confirma si hay algo más en lo que puedas ayudar
   - Agradece la llamada
   - Invita a contactar nuevamente si necesitan más información

TONO Y ESTILO:
- Mantén un tono profesional pero cálido
- Usa lenguaje claro y respetuoso
- Sé paciente y detallado en tus explicaciones
- Muestra entusiasmo por ayudar
- Personaliza las respuestas según el contexto de la llamada

RESTRICCIONES:
- No hagas reservas directas
- No proporciones información confidencial
- No hagas promesas que no puedas cumplir
- No discutas precios específicos sin confirmarlos`,

  voice: "adriana",
  model: "enhanced",
  language: "ESP",
  interruption_threshold: 150,
  wait_for_greeting: false,
  max_duration: 300,
  record: true,
  reduce_latency: true,
  amd: true,

  dynamic_data: [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/bland/business/{{request_data.businessId}}`,
      method: "GET",
      headers: {
        authorization: "{{BLAND_API_KEY}}",
      },
      response_data: [
        {
          name: "hotel_name",
          data: "$.hotelName",
          context: "Nombre del hotel: {{hotel_name}}",
        },
        {
          name: "check_in_time",
          data: "$.checkInTime",
          context: "Horario de check-in: {{check_in_time}}",
        },
        {
          name: "check_out_time",
          data: "$.checkOutTime",
          context: "Horario de check-out: {{check_out_time}}",
        },
        {
          name: "amenities",
          data: "$.amenities",
          context: "Servicios disponibles: {{amenities}}",
        },
        {
          name: "room_types",
          data: "$.roomTypes",
          context: "Tipos de habitaciones: {{room_types}}",
        },
        {
          name: "policies",
          data: "$.policies",
          context: "Políticas del hotel: {{policies}}",
        },
        {
          name: "parking_info",
          data: "$.parkingInfo",
          context: "Información de estacionamiento: {{parking_info}}",
        },
        {
          name: "wifi_info",
          data: "$.wifiInfo",
          context: "Información de WiFi: {{wifi_info}}",
        },
        {
          name: "restaurant_info",
          data: "$.restaurantInfo",
          context: "Información del restaurante: {{restaurant_info}}",
        },
        {
          name: "nearby_attractions",
          data: "$.nearbyAttractions",
          context: "Atracciones cercanas: {{nearby_attractions}}",
        },
        {
          name: "transportation_info",
          data: "$.transportationInfo",
          context: "Información de transporte: {{transportation_info}}",
        },
        {
          name: "languages_spoken",
          data: "$.languagesSpoken",
          context: "Idiomas hablados: {{languages_spoken}}",
        },
      ],
    },
  ],
  webhook: `${process.env.NEXT_PUBLIC_APP_URL}/api/bland/webhook`,
  voice_webhook: `${process.env.NEXT_PUBLIC_APP_URL}/api/bland/inbound`,
};
