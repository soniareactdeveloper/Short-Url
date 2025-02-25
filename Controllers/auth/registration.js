const registrations = (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname) {
    return res.json({ error: 'Full name is required' });
  }

  if (!email) {
    return res.json({ error: 'Email is required' });
  }

  // Enhanced email validation regex (strict format)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.json({ error: 'Invalid email format' });
  }

  if (!password) {
    return res.json({ error: 'Password is required' });
  }

  // Enhanced password validation regex (at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.json({ error: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
  }

  res.json({ message: 'Registration successful' });
}

module.exports = registrations;
