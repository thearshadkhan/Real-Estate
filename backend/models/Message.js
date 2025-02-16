// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema({
//     propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
//     senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     message: { type: String, required: true },
//     timestamp: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Message", messageSchema);

// // const mongoose = require("mongoose");

// // const MessageSchema = new mongoose.Schema({
// //     propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
// //     senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// //     message: { type: String, required: true },
// //     replies: [
// //         {
// //             senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// //             message: String,
// //             createdAt: { type: Date, default: Date.now }
// //         }
// //     ],
// // }, { timestamps: true });

// // module.exports = mongoose.model("Message", MessageSchema);
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    isReply: { type: Boolean, default: false },
    parentMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }], // Ensure replies field exists
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);
