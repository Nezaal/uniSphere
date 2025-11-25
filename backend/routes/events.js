import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent); 
    //id somethign goes wrong
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Could not create event", details: err.message });
  }
});


router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
});


export default router;