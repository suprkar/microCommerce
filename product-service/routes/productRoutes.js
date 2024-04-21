const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Adding a product to the database
router.post('/addproduct', async (req, res) => {
    try {
        // Retrieve product data from request body
        const { id, name, image, category, new_price, old_price } = req.body;

        // Check if the product with the given id already exists to prevent duplicates
        const existingProduct = await Product.findOne({ id });
        if (existingProduct) {
            return res.status(400).json({ success: false, message: "Product with this ID already exists" });
        }

        // Create a new product instance
        const newProduct = new Product({
            id,
            name,
            image,
            category,
            new_price,
            old_price
        });

        // Save the product to the database
        await newProduct.save();
        res.json({ success: true, message: "Product added successfully", product: newProduct });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Fetching all products from the database
router.get('/allproducts', async (req, res) => {
    try {
        // Retrieve all products from the database
        const products = await Product.find({});
        res.json({ success: true, products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
