import mongoose from "mongoose"

const registrationSchema = new mongoose.Schema({
    "userId": String,
    "eventId": {
        type: mongoose.Schema.Types.ObjectId, // <-- UPDATED: Use ObjectId type
        ref: 'Event', // <-- NEW: Reference the 'Event' model name
        required: true
    }
});

export default mongoose.model("registrations", registrationSchema); 