import express from 'express';
import config from './app/config';
import furnitureRouter from './app/modules/furniture/furniture.router';
import authRouter from './app/modules/auth/auth.router';

const app = express();

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
