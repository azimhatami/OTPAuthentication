const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');
const setupSwagger = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to DB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger config
setupSwagger(app);

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

