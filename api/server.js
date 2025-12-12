import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import eventRoutes from '../backend/routes/events.js';
import registrationRoutes from '../backend/routes/registrations.js';

const app = express();

app.use(cors());
app.use(express.json());


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env (local) or Vercel Settings (production)'
  );
}



let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});


app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

export default app;