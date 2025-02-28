// helpers/passwordValidator.js

const validatePassword = (password) => {
  // Check if the password is at least 8 characters long
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters long.' };
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { error: 'Password must contain at least one uppercase letter.' };
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { error: 'Password must contain at least one lowercase letter.' };
  }

  // Check if the password contains at least one number
  if (!/\d/.test(password)) {
    return { error: 'Password must contain at least one number.' };
  }

  // Check if the password contains at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { error: 'Password must contain at least one special character.' };
  }

  // If all checks pass, return success
  return { success: true };
};

module.exports = validatePassword;
