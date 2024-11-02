"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function FormHotelConfig({ initialData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    hotelName: initialData?.hotelName || "",
    address: initialData?.address || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    checkInTime: initialData?.checkInTime || "03:00 PM",
    checkOutTime: initialData?.checkOutTime || "11:00 AM",
    amenities: initialData?.amenities || "",
    roomTypes: initialData?.roomTypes || "",
    policies: initialData?.policies || "",
    parkingInfo: initialData?.parkingInfo || "",
    wifiInfo: initialData?.wifiInfo || "",
    restaurantInfo: initialData?.restaurantInfo || "",
    nearbyAttractions: initialData?.nearbyAttractions || "",
    transportationInfo: initialData?.transportationInfo || "",
    languagesSpoken: initialData?.languagesSpoken || "",
    twilioNumber: initialData?.twilioNumber || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function convertTo12Hour(time24) {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${hours12.toString().padStart(2, "0")}:${minutes} ${period}`;
  }

  function handleTimeChange(e) {
    const { name, value } = e.target;
    const time12 = convertTo12Hour(value);
    setFormData((prev) => ({ ...prev, [name]: time12 }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (
        formData.twilioAccountSid &&
        formData.twilioAuthToken &&
        formData.twilioNumber
      ) {
        const twilioResponse = await fetch("/api/bland/twilio/encrypt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountSid: formData.twilioAccountSid,
            authToken: formData.twilioAuthToken,
            phoneNumber: formData.twilioNumber,
          }),
        });

        if (!twilioResponse.ok) {
          throw new Error("Error configuring Twilio");
        }
      }

      const response = await fetch("/api/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error saving business configuration");
      }

      toast.success("Configuration saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function TimeSelector({ label, value, name, onChange }) {
    // Generar opciones de hora (1-12)
    const hours = Array.from({ length: 12 }, (_, i) => {
      const hour = i + 1;
      return hour.toString().padStart(2, "0");
    });

    // Generar opciones de minutos (00-59)
    const minutes = Array.from({ length: 12 }, (_, i) => {
      const minute = i * 5;
      return minute.toString().padStart(2, "0");
    });

    // Separar el valor actual en hora, minutos y período
    const [time, period] = value.split(" ");
    const [currentHour, currentMinute] = time.split(":");

    const handleTimeChange = (type, newValue) => {
      const [oldHour, oldMinute] = value.split(" ")[0].split(":");
      const oldPeriod = value.split(" ")[1];

      let newTime;
      if (type === "hour") {
        newTime = `${newValue}:${oldMinute} ${oldPeriod}`;
      } else if (type === "minute") {
        newTime = `${oldHour}:${newValue} ${oldPeriod}`;
      } else {
        newTime = `${oldHour}:${oldMinute} ${newValue}`;
      }

      onChange({ target: { name, value: newTime } });
    };

    return (
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">{label}</span>
        </label>
        <div className="flex gap-2">
          <select
            value={currentHour}
            onChange={(e) => handleTimeChange("hour", e.target.value)}
            className="select select-bordered flex-1"
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select
            value={currentMinute}
            onChange={(e) => handleTimeChange("minute", e.target.value)}
            className="select select-bordered flex-1"
          >
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
          <select
            value={period}
            onChange={(e) => handleTimeChange("period", e.target.value)}
            className="select select-bordered w-24"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información Básica */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Nombre del Hotel</span>
          </label>
          <input
            type="text"
            name="hotelName"
            value={formData.hotelName}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ej: Hotel Paradise"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Teléfono</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ej: +52 123 456 7890"
            required
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-medium">Dirección</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Dirección completa del hotel"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="contacto@hotel.com"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Idiomas que se hablan
            </span>
          </label>
          <input
            type="text"
            name="languagesSpoken"
            value={formData.languagesSpoken}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ej: Español, Inglés, Francés"
            required
          />
        </div>

        {/* Horarios */}
        <div className="form-control md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TimeSelector
              label="Hora de Check-in"
              value={formData.checkInTime}
              name="checkInTime"
              onChange={handleChange}
            />
            <TimeSelector
              label="Hora de Check-out"
              value={formData.checkOutTime}
              name="checkOutTime"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Información Detallada */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-medium">
              Tipos de Habitaciones y Tarifas
            </span>
          </label>
          <textarea
            name="roomTypes"
            value={formData.roomTypes}
            onChange={handleChange}
            className="textarea textarea-bordered h-32"
            placeholder="Describe los tipos de habitaciones y sus tarifas..."
            required
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-medium">Amenidades</span>
          </label>
          <textarea
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="textarea textarea-bordered h-32"
            placeholder="Lista las amenidades del hotel..."
            required
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-medium">Políticas del Hotel</span>
          </label>
          <textarea
            name="policies"
            value={formData.policies}
            onChange={handleChange}
            className="textarea textarea-bordered h-32"
            placeholder="Políticas importantes del hotel..."
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Información de Estacionamiento
            </span>
          </label>
          <textarea
            name="parkingInfo"
            value={formData.parkingInfo}
            onChange={handleChange}
            className="textarea textarea-bordered"
            placeholder="Describe las opciones de estacionamiento..."
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Información de WiFi</span>
          </label>
          <textarea
            name="wifiInfo"
            value={formData.wifiInfo}
            onChange={handleChange}
            className="textarea textarea-bordered"
            placeholder="Disponibilidad y acceso al WiFi..."
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Información del Restaurante
            </span>
          </label>
          <textarea
            name="restaurantInfo"
            value={formData.restaurantInfo}
            onChange={handleChange}
            className="textarea textarea-bordered"
            placeholder="Horarios, tipo de comida, reservaciones..."
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Atracciones Cercanas</span>
          </label>
          <textarea
            name="nearbyAttractions"
            value={formData.nearbyAttractions}
            onChange={handleChange}
            className="textarea textarea-bordered"
            placeholder="Lugares de interés cercanos al hotel..."
            required
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-medium">
              Información de Transporte
            </span>
          </label>
          <textarea
            name="transportationInfo"
            value={formData.transportationInfo}
            onChange={handleChange}
            className="textarea textarea-bordered"
            placeholder="Opciones de transporte, distancia al aeropuerto..."
            required
          />
        </div>
      </div>

      <div className="divider">Configuración de Twilio</div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">
            Número de Teléfono para Recepcionista AI
          </span>
        </label>
        <input
          type="text"
          name="twilioNumber"
          value={formData.twilioNumber}
          onChange={handleChange}
          placeholder="+1234567890"
          className="input input-bordered"
          required
        />
        <label className="label">
          <span className="label-text-alt">
            Ingresa el número de teléfono que usará el recepcionista AI
          </span>
        </label>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className={`btn btn-primary ${isLoading ? "loading" : ""}`}
          disabled={isLoading}
        >
          {isLoading
            ? "Guardando..."
            : initialData
            ? "Actualizar Configuración"
            : "Guardar Configuración"}
        </button>
      </div>
    </form>
  );
}
