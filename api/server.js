
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Import your routes
import eventRoutes from '../backend/routes/events.js';
import registrationRoutes from '../backend/routes/registrations.js';

const app = express();

// Use environment variables for connection string in production
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/uniSphere';

// Vercel handles the listener, so we remove the app.listen() call.
// We keep the setup and connection logic.

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Mount routes under the root path for the Vercel function
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

// Export the Express app as a Vercel handler
export default app;


