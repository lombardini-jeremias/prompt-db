import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
    },
    username: {
      type: String,
      unique: true, // Enforcing uniqueness for usernames
      required: [true, "Username is required!"],
      minlength: [8, "Username must be at least 8 characters long!"],
      maxlength: [20, "Username cannot exceed 20 characters!"],
      match: [
        /^(?!.*[_.]{2})(?![_.])[a-zA-Z0-9._]+(?<![_.])$/,
        "Username invalid! It should only contain alphanumeric characters, dots, or underscores and cannot start or end with a special character.",
      ],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` timestamps
  }
);

const User = models.User || model("User", UserSchema);

export default User;
