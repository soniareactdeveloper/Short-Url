const validateEmail = require("../../Helper/validationEmail");
const validatePassword = require("../../Helper/validationPassword");

const registrations = (req, res) => {
  const { fullname, email, password } = req.body;

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

  // Registration successful
  res.json({ message: 'Registration successful' });
};

module.exports = registrations;
