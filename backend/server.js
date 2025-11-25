import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import eventRoutes from './routes/events.js';
import registrationRoutes from './routes/registrations.js';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/uniSphere')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

app.use('/events', eventRoutes);
app.use('/registrations', registrationRoutes);

console.log("this should appear");

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
