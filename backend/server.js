import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

import eventRoutes from './routes/events.js';
import registrationRoutes from './routes/registrations.js';

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;


mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

app.use('/events', eventRoutes);
app.use('/registrations', registrationRoutes);

console.log("this should appear");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
