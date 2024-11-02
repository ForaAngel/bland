import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Business from "@/models/Business";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();
    const business = await Business.findOne({ userId: session.user.id });

    return Response.json(business || null);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error fetching business" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    await connectMongo();

    // Buscar si ya existe un negocio para este usuario
    const existingBusiness = await Business.findOne({
      userId: session.user.id,
    });

    let business;
    if (existingBusiness) {
      // Si existe, actualizamos
      business = await Business.findOneAndUpdate(
        { userId: session.user.id },
        data,
        { new: true }
      );
    } else {
      // Si no existe, creamos uno nuevo
      business = await Business.create({
        ...data,
        userId: session.user.id,
      });
    }

    return Response.json(business);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error saving business" }, { status: 500 });
  }
}
