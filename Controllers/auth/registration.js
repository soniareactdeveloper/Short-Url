const validateEmail = require("../../Helper/validationEmail");
const validatePassword = require("../../Helper/validationPassword");
const UserSchema = require("../../Model/UserSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registrations = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Validate fullname
    if (!fullname) {
      return res.json({ error: "Full name is required" });
    }

    // Validate email
    if (!email) {
      return res.json({ error: "Email is required" });
    }

    const emailValidationResult = validateEmail(email);
    if (emailValidationResult.error) {
      return res.json(emailValidationResult);
    }

    // Validate password
    if (!password) {
      return res.json({ error: "Password is required" });
    }

    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult.error) {
      return res.json(passwordValidationResult);
    }

    // Check if user already exists
    const existUsers = await UserSchema.findOne({ email });
    if (existUsers) {
      return res.json({ error: "User already exists" });
    }

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        return res.json({ error: "Error hashing password" });
      }

      const user = new UserSchema({
        fullname,
        email,
        password: hash,
      });

      await user.save();

      // Registration successful
      res.json({ message: "Registration successful" });
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.json({ error: "Internal server error" });
  }
};

module.exports = registrations;
