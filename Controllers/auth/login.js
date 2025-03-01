const validateEmail = require("../../Helper/validationEmail");
const validatePassword = require("../../Helper/validationPassword");
const UserSchema = require("../../Model/UserSchema");
const bcrypt = require("bcrypt");

const login = async (req,res) => {
   const {email, password} = req.body;
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
      
      const existingUser = await UserSchema.findOne({email})
      
      if (!existingUser) {
        return res.json({ error: "Invalid email" });
      }

      // Load hash from your password DB.
      bcrypt.compare(password, existingUser.password).then(function(result) {
         if (result){
            res.json({ message: "Login successful" });
         }else{
            res.json({ error: "Invalid password" });
         }
      });

}

module.exports = login;