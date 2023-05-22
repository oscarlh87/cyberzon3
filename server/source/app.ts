import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import middlewares from './middlewares';
import { MongoDBConfig } from './interfaces/index';
import server from './routes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { importData } from './utils';

dotenv.config();

const app: Application = express();

// Middleware
middlewares(app);

// Database connection
mongoose
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  .connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // wait time for server selection
  } as MongoDBConfig)
  .then(() => console.log('Database connection successful'))
  .catch((err) => console.error(err));

// Routes
app.use(cookieParser());
app.use(server);

const PORT = process.env.PORT || 5050;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  /** uncomment to upload data */
  /* await importData(); */
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
