require('express-async-errors');
import cors from 'cors';
import express from 'express';
import { errorHandler } from './util/middleware';
import { PORT } from './util/config';
import { connectToDb } from './util/db';
import blogRouter from './controllers/blogs';
import userRouter from './controllers/users';
import loginRouter from './controllers/login';
import authorRouter from './controllers/authors';
import readingListrouter from './controllers/readinglists';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglists', readingListrouter);
app.use(errorHandler);
const start = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
