const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "owner", "user"], default: "user" },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    activityLogs: [{ action: String, timestamp: Date }],
});

module.exports = mongoose.model("User", userSchema);
