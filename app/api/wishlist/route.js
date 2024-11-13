import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import WishList from "@/models/WishList";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await connectMongo();
    const data = await req.json();

    // Asegúrate de que todos los campos requeridos estén presentes
    const wishListData = {
      ...data,
      userId: session.user.id,
    };

    // Usar findOneAndUpdate para actualizar si existe o crear si no existe
    const wishList = await WishList.findOneAndUpdate(
      { userId: session.user.id },
      wishListData,
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      data: wishList,
    });
  } catch (error) {
    console.error("Error en la ruta API:", error);
    return NextResponse.json(
      { error: error.message || "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
