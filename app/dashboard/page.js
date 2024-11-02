import ButtonAccount from "@/components/ButtonAccount";
import ButtonTestCall from "@/components/ButtonTestCall";
import FormHotelConfig from "@/components/FormHotelConfig";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Business from "@/models/Business";

export const dynamic = "force-dynamic";

async function getBusinessData(userId) {
  await connectMongo();
  const business = await Business.findOne({ userId });

  if (!business) return null;
  return JSON.parse(JSON.stringify(business));
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const businessData = await getBusinessData(session.user.id);

  return (
    <main className="min-h-screen p-8 pb-24 bg-base-200">
      <section className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Hotel Dashboard
          </h1>
          <ButtonAccount />
        </div>

        {businessData && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-2xl">
                  Prueba de Recepcionista AI
                </h2>
                <ButtonTestCall businessId={businessData._id} />
              </div>
              <p className="text-base-content/70">
                Haz clic en el botón para probar una llamada con el
                recepcionista AI. Asegúrate de tener configurada la información
                del hotel correctamente.
              </p>
            </div>
          </div>
        )}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">
              {businessData ? "Hotel Configuration" : "Configure Your Hotel"}
            </h2>
            <p className="text-base-content/70 mb-6">
              {businessData
                ? "Update your hotel configuration below."
                : "Configure your hotel details for the AI receptionist to provide accurate information to your guests."}
            </p>
            <FormHotelConfig initialData={businessData} />
          </div>
        </div>
      </section>
    </main>
  );
}
