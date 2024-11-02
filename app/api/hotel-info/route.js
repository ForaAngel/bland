import connectMongo from "@/libs/mongoose";
import Business from "@/models/Business";

export async function POST(req) {
  try {
    const data = await req.json();
    const { hotelId } = data;

    if (!hotelId) {
      return Response.json({ error: "Hotel ID is required" }, { status: 400 });
    }

    await connectMongo();
    const business = await Business.findById(hotelId);

    if (!business) {
      return Response.json({ error: "Hotel not found" }, { status: 404 });
    }

    // Formatear la información para el asistente AI
    const hotelInfo = {
      name: business.hotelName,
      checkIn: business.checkInTime,
      checkOut: business.checkOutTime,
      amenities: business.amenities,
      roomTypes: business.roomTypes,
      policies: business.policies,
      parking: business.parkingInfo,
      wifi: business.wifiInfo,
      restaurant: business.restaurantInfo,
      attractions: business.nearbyAttractions,
      transportation: business.transportationInfo,
      languages: business.languagesSpoken,
      contact: {
        phone: business.phone,
        email: business.email,
        address: business.address,
      },
    };

    return Response.json(hotelInfo);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error fetching hotel info" },
      { status: 500 }
    );
  }
}
