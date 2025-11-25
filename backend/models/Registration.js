import mongoose from "mongoose"

const registrationSchema = new mongoose.Schema({
    "userId": String,
    "eventId": String
});

export default mongoose.model("registrations", registrationSchema); 