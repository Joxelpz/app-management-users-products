const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user.js');
const productRoutes = require('./routes/product.js');
const cors = require("cors");
const authRoutes = require('./routes/auth.js')
 
const app = express();
const port = process.env.PORT || 9000;


let corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

// middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);


// routes
app.get('/', (req, res) => {
    res.send('Welcome');
});

// mongodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then( () => console.log('Connect to MongoDB Atlas'))
    .catch( (error) => console.error(error));



app.listen(port , () => console.log('Server lintening on port', port));