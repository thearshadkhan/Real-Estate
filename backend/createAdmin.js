const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const connectDB = require("./config/db");

const createAdmin = async () => {
  try {
    await connectDB(); // ✅ Connect to MongoDB

    // ✅ Check if an admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists.");
      process.exit(0);
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // ✅ Create admin user
    const admin = new Admin({ name: "Admin", email: "admin@example.com", password: hashedPassword });
    await admin.save();

    console.log("✅ Admin user created successfully!");
    process.exit(0); // Exit the script
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
