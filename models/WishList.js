import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    childName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    parentPhone: {
      type: String,
      required: true,
    },
    behavior: {
      type: String,
      required: true,
    },
    wishList: {
      type: String,
      required: true,
    },
    letter: {
      type: String,
      required: true,
    },
    specialMessage: {
      type: String,
      required: false,
    },
    favoriteColor: {
      type: String,
      required: false,
    },
    favoriteHobby: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const WishList =
  mongoose.models?.WishList || mongoose.model("WishList", wishListSchema);

export default WishList;
