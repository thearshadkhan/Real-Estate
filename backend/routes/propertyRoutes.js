const express = require("express");
const Property = require("../models/Property");

const router = express.Router();

// Add Property
router.post("/", async (req, res) => {
    const { ownerId, title, description, city, locality, type, size, price, photos, amenities } = req.body;

    try {
        const newProperty = new Property({
            ownerId,
            title,
            description,
            city,
            locality,
            type,
            size,
            price,
            photos,
            amenities,
        });

        await newProperty.save();

        res.status(201).json({ message: "Property added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get All Properties
router.get("/", async (req, res) => {
    try {
        const properties = await Property.find().populate("ownerId", "name email");
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
