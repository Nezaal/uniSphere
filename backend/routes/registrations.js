import express from "express";
import Registration from "../models/Registration.js";


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

export default router;
