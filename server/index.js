const dotenv = require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// database connections
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Database is Connected.'))
.catch((err) => console.log('Database is not connected', err));
const app = express();

app.use(express.json());
app.use('/',require('./routes/authRoutes'))

const PORT  = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is runing on port ${PORT}`))
