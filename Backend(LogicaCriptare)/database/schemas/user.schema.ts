import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  profilePicture:{
    type: String
  },
  verification:{
    theCode: {
      type: String,
      default: null
    },
    isVerified:{
      type: Boolean,
      default: false,
      required: true
    },
  },
  forgetPasswordObject:{
    forgetPasswordToken: {
      type: String,
      default: null
    },
    forgetPasswordExpires: {
      type: Date,
      default: Date.now()
    }
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);