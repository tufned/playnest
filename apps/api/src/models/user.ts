import mongoose from "mongoose";
import { UserModel } from "@playnest/utils";
import { authConfig } from "@playnest/utils";
import { schemaErrors } from "../constants/errors.js";

const userSchema = new mongoose.Schema<UserModel>({
  nickname: {
    type: String,
    required: [true, schemaErrors.required("nickname")],
    unique: true,
    minLength: [
      authConfig.nickname.minLength,
      schemaErrors.minLength(authConfig.nickname.minLength)
    ],
    maxLength: [
      authConfig.nickname.maxLength,
      schemaErrors.maxLength(authConfig.nickname.maxLength)
    ]
  },
  password: {
    type: String,
    required: [true, schemaErrors.required("password")]
  },
  email: {
    type: String,
    required: [true, schemaErrors.required("email")],
    unique: true,
    minLength: [
      authConfig.email.minLength,
      schemaErrors.minLength(authConfig.email.minLength)
    ],
    validate: {
      validator: (val: string) => val.includes("@"),
      message: schemaErrors.emailSymbol
    }
  },
  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: schemaErrors.enum("role", ["user", "admin"])
    },
    required: [true, schemaErrors.required("role")],
    default: "user"
  },
  lastChangedAt: {
    type: Date,
    default: () => Date.now()
  }
});

const User = mongoose.model("User", userSchema);

export default User;
