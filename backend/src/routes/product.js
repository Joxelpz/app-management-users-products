const express = require('express');
const productSquema = require('../models/product')
const verifyToken = require('../middleware/Verify-token')

const router = express.Router();

// Creamos un nuevo registro de producto en la db
router.post('/product', async (req, res) => {

    const {identificator, namep, category, amount, price, description} = req.body;

    try{
        const productExist = await productSquema.findOne({ identificator: req.body.identificator });
            //Validamos si ya existe el identificator en la db
            if (productExist) {
            return  res.status(422).send({
                message:
                  "Este identificator ya existe, por favor ingrese uno nuevo",
              });
            }

            const product = new productSquema({
                identificator,
                namep,
                category,
                amount,
                price,
                description
              });
            await product.save();
            res.status(200).json({
            message: "Se ha registrado exitosamente",
            data: product,
    });
    }catch (error) {
            res.status(400).json({ error });
    }
});

// Buscamos los registros de productos en la db
router.get('/product', async (req, res) => {
    try{
        const data = await productSquema.find()
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({ error });

    }
});

// Buscamos un resgistro de un producto por el id
router.get('/product/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try{
        const data = await productSquema.findById(id)
        res.status(200).json(data)
    }catch{
        res.status(500).json({ error });
    }
});


// Modificamos el registro de un producto de la db
router.patch('/product/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { identificator, namep, category, amount, price, description } = req.body;
    try{
        const data = await productSquema.findByIdAndUpdate({ _id: id }, { $set:  { identificator, namep, category, amount, price, description } })
        res.status(200).json(data)

    }catch{
        res.status(500).json({ error });
    }
});

// Borramos el registro de un producto de la db
router.delete('/product/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try{
        const data = await productSquema.deleteOne({ _id: id })
        res.status(200).json(data)
    }catch{
        res.status(500).json({ error });
    }

});

module.exports = router;