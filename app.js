import express from 'express';
import morgan from 'morgan';
import apiRouter from './api/index.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
