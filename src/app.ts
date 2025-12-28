import express from 'express';
import config from './app/config';
import furnitureRouter from './app/modules/furniture/furniture.router';
import authRouter from './app/modules/auth/auth.router';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api/v1', furnitureRouter);
app.use('/api/v1', authRouter);

app.get('/', (req, res) => {
  res.send({
    status: true,
    message: `Server is running at ${config.port}`,
  });
});

export default app;
