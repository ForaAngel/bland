import ButtonAccount from "@/components/ButtonAccount";
import FormSantaWishList from "@/components/FormSantaWishList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import WishList from "@/models/WishList";

export const dynamic = "force-dynamic";

async function getWishListData(userId) {
  await connectMongo();
  const wishList = await WishList.findOne({ userId });

  if (!wishList) return null;
  return JSON.parse(JSON.stringify(wishList));
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const wishListData = await getWishListData(session.user.id);

  return (
    <main className="min-h-screen p-8 pb-24 bg-base-200">
      <section className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold text-red-600">
            Carta a Santa
          </h1>
          <ButtonAccount />
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">
              {wishListData
                ? "Actualizar Carta a Santa"
                : "Escribe tu Carta a Santa"}
            </h2>
            <p className="text-base-content/70 mb-6">
              {wishListData
                ? "Actualiza tu carta para Santa Claus y espera su llamada."
                : "¡Cuéntale a Santa qué te gustaría recibir esta Navidad y él te llamará!"}
            </p>
            <FormSantaWishList initialData={wishListData} />
          </div>
        </div>
      </section>
    </main>
  );
}
