require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const historyRoutes = require('./routes/historyRoutes');

connectDB();

const app = express();

// The Vue frontend (Vite dev server, default http://localhost:5173) needs
// CORS enabled to call this API from the browser.
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
  })
);
app.use(express.json());

// Simple health check — useful for your code demonstration
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SLTS backend', time: new Date().toISOString() });
});

// Mounted to match the paths used in src/services/api.js:
// /api/auth/..., /api/users/..., /api/history...
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/history', historyRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SLTS server running on http://localhost:${PORT}`);
});
