const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const serviceAccount = require('./firebase-adminsdk.json');
dotenv.config();

// ROUTES IMPORTS
const placesRoute = require('./routes/places');

// FIREBASE
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://park-host.firebaseio.com' // Replace with your database URL
});

// EXPRESS AND PORT INSTANCIATION
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