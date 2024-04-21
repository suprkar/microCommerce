const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const secretKey = 'secret_ecom'; // It's advisable to move this to environment variables.

// Utility function to create JWT
const generateToken = (id) => {
  return jwt.sign({ user: { id } }, secretKey, { expiresIn: '24h' });
};

router.post('/signup', async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists with the given email" });
        }

        // Assuming password comes hashed from client for simplicity, or you could hash it here.
        user = new User({
            userName,
            email,
            password,
            cartData: {} // Initially empty cart.
        });
        
        await user.save();
        const token = generateToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Here you should compare the hashed password.
        if (password !== user.password) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/getcart', async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Assuming user id comes from a middleware that decodes JWT
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, cartData: user.cartData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/addtocart', async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.cartData[itemId]) {
            user.cartData[itemId] = 0;
        }

        user.cartData[itemId] += quantity;
        await user.save();

        res.json({ success: true, cartData: user.cartData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/removefromcart', async (req, res) => {
    try {
        const { itemId } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.cartData[itemId] && user.cartData[itemId] > 0) {
            user.cartData[itemId] -= 1;
        }

        await user.save();
        res.json({ success: true, cartData: user.cartData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
