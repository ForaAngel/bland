"use client";
import config from "@/config";
import ButtonCheckout from "./ButtonCheckout";
import { motion } from "framer-motion";

const PriceCard = ({ plan }) => {
  return (
    <motion.div
      className="relative w-full max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {plan.isFeatured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <span className="badge text-xs text-white font-semibold border-0 bg-red-600">
            REGALO ESPECIAL 🎁
          </span>
        </div>
      )}

      {plan.isFeatured && (
        <div className="absolute -inset-[1px] rounded-[9px] bg-red-600 z-10"></div>
      )}

      <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-lg">
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold text-red-600">
              {plan.name}
            </p>
            {plan.description && (
              <p className="text-base-content/80 mt-2">{plan.description}</p>
            )}
          </div>
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100">
            <span className="text-2xl">{plan.isFeatured ? "🎅" : "🎄"}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {plan.priceAnchor && (
            <div className="flex flex-col justify-end mb-[4px] text-lg">
              <p className="relative">
                <span className="absolute bg-base-content h-[1.5px] inset-x-0 top-[53%]"></span>
                <span className="text-base-content/80">
                  ${plan.priceAnchor}
                </span>
              </p>
            </div>
          )}
          <p className="text-5xl tracking-tight font-extrabold text-green-600">
            ${plan.price}
          </p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs text-base-content/60 uppercase font-semibold">
              USD
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-red-50 rounded-lg">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {plan.calls || "∞"}
            </p>
            <p className="text-sm text-base-content/70">Llamadas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {plan.response || "24/7"}
            </p>
            <p className="text-sm text-base-content/70">Disponibilidad</p>
          </div>
        </div>

        {plan.features && (
          <ul className="space-y-2.5 leading-relaxed text-base flex-1">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-lg">✨</span>
                <span>{feature.name}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="space-y-2">
          <ButtonCheckout priceId={plan.priceId} />
          <p className="flex items-center justify-center gap-2 text-sm text-center text-base-content/80 font-medium">
            <span className="text-xl">🎄</span>
            Magia navideña garantizada
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <section className="bg-base-200 overflow-hidden" id="pricing">
      {/* Copos de nieve sutiles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-red-600/10 rounded-full"
          initial={{ y: -20, x: Math.random() * 100 + "%", opacity: 0 }}
          animate={{
            y: "100vh",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "linear",
          }}
        />
      ))}

      <div className="py-24 px-8 max-w-5xl mx-auto">
        <motion.div
          className="flex flex-col text-center w-full mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-medium text-red-600 mb-8">
            Planes Mágicos de Navidad
          </p>
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight text-red-600">
            Elige tu Plan Navideño 🎄
          </h2>
          <p className="mt-4 text-base-content/70 text-lg">
            Haz que esta Navidad sea especial con una llamada personal de Santa
          </p>
        </motion.div>

        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {config.stripe.plans.map((plan) => (
            <PriceCard key={plan.priceId} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
