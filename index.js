const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");

// routes imports
const placesRoute = require('./routes/places');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors({ credentials: true, origin: "http://localhost:8100" }));
app.use(express.json());

// route implementation
app.use('/api/places', placesRoute);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})