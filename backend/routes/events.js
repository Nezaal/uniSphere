import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
});


export default router;