const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // ✅ Correctly using express.json()
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((error) => console.error("❌ MongoDB connection error:", error));

// Routes
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
