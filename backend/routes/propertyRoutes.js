const express = require("express");
const Property = require("../models/Property");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Add Property (POST)
router.post("/", authenticateToken, async (req, res) => {
  const { title, description, city, locality, type, size, price, photos, amenities } = req.body;

  try {
    const newProperty = new Property({
      ownerId: req.user.id, // Use the authenticated user's ID from the token
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

// Get All Properties (GET - Public)
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().populate("ownerId", "name email");
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Property by ID (GET - Public)
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("ownerId", "name email");
    if (!property) return res.status(404).json({ message: "Property not found" });

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Property (PUT - Protected)
router.put("/:id", authenticateToken, async (req, res) => {
  const { title, description, city, locality, type, size, price, photos, amenities } = req.body;

  try {
    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ message: "Property not found" });
    if (property.ownerId.toString() !== req.user.id)
      return res.status(403).json({ message: "You are not authorized to update this property" });

    // Update property fields
    property.title = title || property.title;
    property.description = description || property.description;
    property.city = city || property.city;
    property.locality = locality || property.locality;
    property.type = type || property.type;
    property.size = size || property.size;
    property.price = price || property.price;
    property.photos = photos || property.photos;
    property.amenities = amenities || property.amenities;

    await property.save();
    res.status(200).json({ message: "Property updated successfully", property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Property (DELETE - Protected)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ message: "Property not found" });
    if (property.ownerId.toString() !== req.user.id)
      return res.status(403).json({ message: "You are not authorized to delete this property" });

    await property.remove();
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;




