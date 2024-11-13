"use client";

import { useState } from "react";
import apiClient from "@/libs/api";
import { motion } from "framer-motion";

// This component is used to create Stripe Checkout Sessions
// It calls the /api/stripe/create-checkout route with the priceId, successUrl and cancelUrl
// By default, it doesn't force users to be authenticated. But if they are, it will prefill the Checkout data with their email and/or credit card. You can change that in the API route
// You can also change the mode to "subscription" if you want to create a subscription instead of a one-time payment
const ButtonCheckout = ({ priceId, mode = "payment" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const res = await apiClient.post("/stripe/create-checkout", {
        priceId,
        mode,
        successUrl: window.location.href,
        cancelUrl: window.location.href,
      });

      window.location.href = res.url;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <motion.button
      className="relative w-full px-6 py-3 text-white font-medium bg-gradient-to-r from-red-600 to-red-500 rounded-lg shadow-lg hover:shadow-red-500/25 transition-shadow group overflow-hidden"
      onClick={() => handlePayment()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Efecto de brillo */}
      <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[25deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000" />

      <div className="relative flex items-center justify-center gap-2">
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span className="text-lg">🎁</span>
            <span>Reservar Llamada con Santa</span>
            <span className="text-lg">📱</span>
          </>
        )}
      </div>

      {/* Copos de nieve decorativos */}
      <div className="absolute -top-1 left-2 text-white/30 text-xs">❄</div>
      <div className="absolute -bottom-1 right-2 text-white/30 text-xs">❄</div>
    </motion.button>
  );
};

export default ButtonCheckout;
