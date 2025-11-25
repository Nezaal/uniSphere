import express from "express";
import Registration from "../models/Registration.js";
import Event from "../models/Event.js"; 

const router = express.Router();

// Register for an event
router.post("/", async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const existing = await Registration.findOne({ userId, eventId });
    if (existing) return res.json({ message: "Already registered" });

    const reg = await Registration.create({ userId, eventId });
    res.json(reg);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// get reg events for user(all that user registered for)
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const registrations = await Registration.find({ userId })
      .populate('eventId'); 

    const events = registrations
        .map(reg => reg.eventId)
        .filter(event => event); 

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;