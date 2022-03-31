const express = require('express');
const userSquema = require('../models/user')
const verifyToken = require('../middleware/Verify-token')

const router = express.Router();

// Creamos un registro de usuario en la db
router.post('/users', async (req, res) => {

    const {name, username, pass, select, email, phone} = req.body;

    try{
        const userExist = await userSquema.findOne({ username: req.body.username });
            //Validamos si ya existe el username en la db
            if (userExist) {
            return  res.status(422).send({
                message:
                  "Este username ya existe, por favor ingrese uno nuevo",
              });
            }
        const emailExist = await userSquema.findOne({ email: req.body.email });
            //Validamos si ya existe el email en la db
            if (emailExist) {
            return res.status(400).json({
                message: "Este email ya existe, por favor ingrese uno nuevo",
            });
            }
            const user = new userSquema({
                name,
                email,
                phone,
                username,
                select,
                pass: await userSquema.encryptPassword(pass),
              });
            await user.save();
            res.status(200).json({
            message: "Se ha registrado exitosamente",
            data: user,
    });
    }catch (error) {
            res.status(400).json({ error });
    }
});

// Buscamos el registro de los usuario en la db
router.get('/users', async (req, res) => {
    try{
        const data = await userSquema.find()
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({ error });

    }
});

// Buscamos el registro de un usuario de la db por id
router.get('/users/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try{
        const data = await userSquema.findById(id)
        res.status(200).json(data)
    }catch{
        res.status(500).json({ error });
    }
});


// Modificamos el registro de un usuario de la db
router.patch('/users/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { name, username, pass, select, email, phone } = req.body;
    try{
        const data = await userSquema.findByIdAndUpdate({ _id: id }, { $set:  { name, username, pass: await userSquema.encryptPassword(pass), select, email, phone } })
        res.status(200).json(data)

    }catch{
        res.status(500).json({ error });
    }
});

// Borramos el registro de un usuario de la db
router.delete('/users/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try{
        const data = await userSquema.deleteOne({ _id: id })
        res.status(200).json(data)
    }catch{
        res.status(500).json({ error });
    }

});



module.exports = router;