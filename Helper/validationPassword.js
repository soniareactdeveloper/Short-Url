const validatePassword = (password) => {
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters long.' };
  }

  if (!/[A-Z]/.test(password)) {
    return { error: 'Password must contain at least one uppercase letter.' };
  }

  if (!/[a-z]/.test(password)) {
    return { error: 'Password must contain at least one lowercase letter.' };
  }

  if (!/\d/.test(password)) {
    return { error: 'Password must contain at least one number.' };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { error: 'Password must contain at least one special character.' };
  }

  return { success: true };
};

module.exports = validatePassword;
