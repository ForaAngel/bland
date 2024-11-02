"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ButtonTestCall({ businessId }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleTestCall() {
    setIsLoading(true);
    try {
      const phoneNumber = prompt(
        "Por favor ingresa tu número de teléfono para la prueba:"
      );

      if (!phoneNumber) {
        toast.error("Se requiere un número de teléfono");
        return;
      }

      const response = await fetch("/api/bland/test-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          businessId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar la llamada de prueba");
      }

      toast.success("Llamada de prueba iniciada exitosamente");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Error al procesar la llamada de prueba");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleTestCall}
      disabled={isLoading}
      className="btn btn-primary"
    >
      {isLoading ? "Iniciando llamada..." : "Probar Llamada"}
    </button>
  );
}
