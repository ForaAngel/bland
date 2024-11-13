"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function FormSantaWishList({ initialData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [formData, setFormData] = useState({
    childName: initialData?.childName || "",
    age: initialData?.age || "",
    behavior: initialData?.behavior || "",
    wishList: initialData?.wishList || "",
    letter: initialData?.letter || "",
    specialMessage: initialData?.specialMessage || "",
    favoriteColor: initialData?.favoriteColor || "",
    favoriteHobby: initialData?.favoriteHobby || "",
    phoneNumber: initialData?.phoneNumber || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al guardar la carta");
      }

      toast.success("¡Tu carta ha sido enviada a Santa!");

      // Opcional: redirigir o actualizar la UI
      // window.location.reload();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error(error.message || "Error al enviar la carta");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCall() {
    setIsCalling(true);
    try {
      const response = await fetch("/api/santa-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: formData.phoneNumber,
          task: `You are Santa Claus making a special call to a child. Be warm, jolly, and magical!
                 Important details about ${formData.childName}:
                 - Age: ${formData.age} years old
                 - Behavior this year: ${formData.behavior}
                 - Favorite color: ${formData.favoriteColor}
                 - Favorite hobby: ${formData.favoriteHobby}
                 - Wish list: ${formData.wishList}
                 - Special message: ${formData.specialMessage}
                 
                 Guidelines:
                 - Always maintain a jolly, warm, and magical tone
                 - Use phrases like "Ho ho ho!", "Merry Christmas!", and Spanish holiday greetings
                 - Praise good behavior and gently encourage better behavior if needed
                 - Show interest in their hobbies and favorite things
                 - Never promise specific gifts, but express excitement about their wishes
                 - Keep the magic of Christmas alive
                 - End the call with encouragement and holiday cheer`,
          voice: "mason", // Santa's voice - deep and warm
          first_sentence: "¡Jo jo jo! ¿Hablo con " + formData.childName + "?",
          wait_for_greeting: true,
          language: "ESP",
          max_duration: 5,
          model: "enhanced",
          reduce_latency: true,
          block_interruptions: false,
          interruption_threshold: 150, // More patient for kids
          metadata: {
            call_type: "santa_call",
            child_name: formData.childName,
            child_age: formData.age,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Error al realizar la llamada");
      }

      toast.success("¡Santa está llamando! 🎅");
    } catch (error) {
      console.error("Error en la llamada:", error);
      toast.error("No se pudo conectar con Santa");
    } finally {
      setIsCalling(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Tu Nombre</span>
          </label>
          <input
            type="text"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ej: María"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Tu Edad</span>
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ej: 8"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              ¿Te has portado bien?
            </span>
          </label>
          <select
            name="behavior"
            value={formData.behavior}
            onChange={handleChange}
            className="select select-bordered"
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="muy bien">¡Me he portado muy bien!</option>
            <option value="bien">Me he portado bien</option>
            <option value="regular">Regular, pero prometo mejorar</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Tu Color Favorito</span>
          </label>
          <input
            type="text"
            name="favoriteColor"
            value={formData.favoriteColor}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ej: Azul"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Tu Hobby Favorito</span>
            <span className="label-text-alt text-xs text-base-content/70">
              ¿Qué te gusta hacer en tu tiempo libre?
            </span>
          </label>
          <input
            type="text"
            name="favoriteHobby"
            value={formData.favoriteHobby}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ej: Jugar fútbol, dibujar, bailar..."
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-medium">Tu Lista de Deseos</span>
          </label>
          <textarea
            name="wishList"
            value={formData.wishList}
            onChange={handleChange}
            className="textarea textarea-bordered h-32"
            placeholder="Lista los regalos que te gustaría recibir..."
            required
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-medium">Tu Carta para Santa</span>
          </label>
          <textarea
            name="letter"
            value={formData.letter}
            onChange={handleChange}
            className="textarea textarea-bordered h-48"
            placeholder="Querido Santa..."
            required
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-medium">
              Mensaje Especial para Santa
            </span>
          </label>
          <textarea
            name="specialMessage"
            value={formData.specialMessage}
            onChange={handleChange}
            className="textarea textarea-bordered"
            placeholder="¿Algo más que quieras decirle a Santa?"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Número de Teléfono</span>
            <span className="label-text-alt text-xs text-base-content/70">
              Para que Santa pueda llamarte
            </span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ej: +52 123 456 7890"
            required
          />
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={handleCall}
          disabled={isCalling || !formData.phoneNumber}
          className="btn btn-secondary"
        >
          {isCalling ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Llamar a Santa 🎅"
          )}
        </button>
        <button type="submit" className="btn btn-primary">
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Guardar Carta"
          )}
        </button>
      </div>
    </form>
  );
}
