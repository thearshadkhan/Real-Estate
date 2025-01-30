const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    locality: { type: String, required: true },
    type: { 
        type: String, 
        enum: ["land", "home", "office", "Apartment"], // Add "Apartment" if needed
        required: true 
    },
    size: { type: Number, required: true },
    price: { type: Number, required: true },
    photos: { type: [String], default: [] },
    likes: { type: Number, default: 0 },
    amenities: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
