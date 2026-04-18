import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
// Create User schema
// Fields:
// - name (String, required)
// - email (String, required, unique)
// - password (String, required, minlength 6)
// - createdAt (default Date.now)

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  } catch (error) {
    console.error(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
