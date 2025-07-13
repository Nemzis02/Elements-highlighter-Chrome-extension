import express from 'express';
import parserRoutes from './routes/parserRoutes';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/parser', parserRoutes);
app.use(errorHandler);

export default app;
