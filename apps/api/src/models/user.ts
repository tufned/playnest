import mongoose from "mongoose";
import { UserEntity } from "@playnest/shared/types/domains/user.types";
import { authConfig } from "@playnest/shared/configs/auth.config";
import { schemaErrors } from "../constants/errors.js";

const userSchema = new mongoose.Schema<UserEntity>({
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
  lastChangedAt: {
    type: Date,
    default: () => Date.now()
  }
});

const User = mongoose.model("User", userSchema);

export default User;
