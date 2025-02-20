
 const generateShortId = (url) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let shortId = '';
  let randomIndex;


  for (let i = 0; i < 5; i++) {
    randomIndex = Math.floor(Math.random() * characters.length);
    shortId += characters[randomIndex];
  }

  return shortId; 
};

module.exports = generateShortId;
