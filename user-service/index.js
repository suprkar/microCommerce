const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();
const port = 4001;

app.use(express.json());
app.use(cors());

mongoose.connect("your-mongodb-connection-string-here");

app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`User Service running on port ${port}`);
});
