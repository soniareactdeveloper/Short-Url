const UserSchema = require("../../Model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // Validate email
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Validate password
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Check if user exists
    const existingUser = await UserSchema.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check password
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const access_token = jwt.sign(
      {
        data: {
          id: existingUser.id,
          email: existingUser.email,
        },
      },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    // Fetch user details without password
    const loggedUser = await UserSchema.findOne({ email }).select("-password");

    // Set cookie and redirect
    res
      .cookie("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .redirect("/");

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = login;
