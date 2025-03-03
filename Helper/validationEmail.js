const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateEmail = (email) => {
  if (!emailRegex.test(email)) {
    return { error: 'Invalid email formatrrr' };
  }
  return { success: true };
};

module.exports = validateEmail;
