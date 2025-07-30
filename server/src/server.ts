// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Default route
app.get('/', (_req, res) => {
  res.send('Order & Payment Management API is running!');
});
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
