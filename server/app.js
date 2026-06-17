import express from 'express';
import cors from 'cors';
import algoRoutes from './routes/algoRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/algorithms', algoRoutes);

// Basic health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Root route
app.get('/', (req, res) => {
  res.send('DSA Visualizer API Server is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
