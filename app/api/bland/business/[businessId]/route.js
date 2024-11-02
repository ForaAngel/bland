import connectMongo from "@/libs/mongoose";
import Business from "@/models/Business";

export async function GET(req, { params }) {
  try {
    // Validar la API key de Bland
    const blandApiKey = req.headers.get("authorization");
    if (process.env.BLAND_API_KEY !== blandApiKey) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { businessId } = params;

    if (!businessId) {
      return Response.json(
        { error: "Business ID is required" },
        { status: 400 }
      );
    }

    await connectMongo();
    const business = await Business.findById(businessId);

    if (!business) {
      return Response.json({ error: "Business not found" }, { status: 404 });
    }

    // Formatear la información para el agente de Bland
    const businessInfo = {
      businessId: business._id,
      hotelName: business.hotelName,
      checkInTime: business.checkInTime,
      checkOutTime: business.checkOutTime,
      amenities: business.amenities,
      roomTypes: business.roomTypes,
      policies: business.policies,
      parkingInfo: business.parkingInfo,
      wifiInfo: business.wifiInfo,
      restaurantInfo: business.restaurantInfo,
      nearbyAttractions: business.nearbyAttractions,
      transportationInfo: business.transportationInfo,
      languagesSpoken: business.languagesSpoken,
      contact: {
        phone: business.phone,
        email: business.email,
        address: business.address,
      },
    };

    return Response.json(businessInfo);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error fetching business info" },
      { status: 500 }
    );
  }
}
