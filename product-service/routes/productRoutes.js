const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.post('/addproduct', async (req, res) => {
    // Add product logic here
});

router.get('/allproducts', async (req, res) => {
    // Fetch all products
});

module.exports = router;
