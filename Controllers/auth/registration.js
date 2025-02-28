const validateEmail = require("../../Helper/validationEmail");
const validatePassword = require("../../Helper/validationPassword");
const UserSchema = require("../../Model/UserSchema");

const registrations = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // Validate fullname
    if (!fullname) {
      return res.json({ error: 'Full name is required' });
    }

    // Validate email
    if (!email) {
      return res.json({ error: 'Email is required' });
    }

    const emailValidationResult = validateEmail(email);
    if (emailValidationResult.error) {
      return res.json(emailValidationResult);  
    }

    // Validate password
    if (!password) {
      return res.json({ error: 'Password is required' });
    }

    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult.error) {
      return res.json(passwordValidationResult);  
    }

    // Create and save the user
    const user = new UserSchema({
      fullname,
      email,
      password,
    });

    await user.save();

    // Registration successful
    res.json({ message: 'Registration successful' });

  } catch (error) {
    // Handle any errors that occur during registration
    console.error(error);
    res.json({ error: 'An error occurred during registration' });
  }
};

module.exports = registrations;
