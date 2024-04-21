const express = require('express');
const multer = require('multer');
const path = require('path');
const imageRoutes = require('./routes/imageRoutes');
const cors = require('cors');
const app = express();
const port = 4003;

app.use(express.json());
app.use(cors());

app.use('/api/images', imageRoutes);

app.listen(port, () => {
    console.log(`Image Service running on port ${port}`);
});
