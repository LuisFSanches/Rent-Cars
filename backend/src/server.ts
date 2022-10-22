import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';

import "./database";

dotenv.config();

const app = express();

const port = 3333;

app.use(express.json());

app.use(router);

app.listen(port, () => console.log(`server running at por ${port}`));