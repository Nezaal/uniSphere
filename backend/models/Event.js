import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: String,
  club: String,
  category: String,
  date: String,
  time: String,
  venue: String,
  description: String,
})

export default Event = mongoose.model('Event', eventSchema); 