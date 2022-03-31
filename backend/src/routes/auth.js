const express = require("express");
const jwt = require("jsonwebtoken");
const userSquema = require("../models/user");


const router = express.Router();

router.post("/singin", async (req, res) => {
    console.log(req.body)
    try {
      //Validamos si el usuario existe
      const user = await userSquema.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).json({ message: "El usuario no existe" });
      }
      console.log(user.pass.toString())
      const validatePassword = await userSquema.comparePassword(
        req.body.pass,
        user.pass
      );
      if (!validatePassword) {
        return res.status(400).json({ message: "La contraseña es invalida" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400,
      });
  
      res.json({ data: user, token });
    } catch (error) {
      console.log(error);
    }
});

module.exports = router;