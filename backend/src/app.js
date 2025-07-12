import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import aiRouter from './routes/ai.js';

const app = express();

app.disable('etag');

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Placeholder routes
app.use('/api/auth', authRouter);
app.use('/api/travel', (req, res) => res.send('Travel route'));
app.use('/api/ai', aiRouter);

export default app;
