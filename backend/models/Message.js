const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);

// const mongoose = require("mongoose");

// const MessageSchema = new mongoose.Schema({
//     propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
//     senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     message: { type: String, required: true },
//     replies: [
//         {
//             senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//             message: String,
//             createdAt: { type: Date, default: Date.now }
//         }
//     ],
// }, { timestamps: true });

// module.exports = mongoose.model("Message", MessageSchema);
