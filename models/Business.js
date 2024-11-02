import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    hotelName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    checkInTime: { type: String, required: true },
    checkOutTime: { type: String, required: true },
    amenities: { type: String, required: true },
    roomTypes: { type: String, required: true },
    policies: { type: String, required: true },
    parkingInfo: { type: String, required: true },
    wifiInfo: { type: String, required: true },
    restaurantInfo: { type: String, required: true },
    nearbyAttractions: { type: String, required: true },
    transportationInfo: { type: String, required: true },
    languagesSpoken: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    callHistory: [
      {
        callId: String,
        fromNumber: String,
        duration: Number,
        status: String,
        transcript: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    twilioNumber: {
      type: String,
      required: true,
    },
    twilioConfigured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Business ||
  mongoose.model("Business", businessSchema);
