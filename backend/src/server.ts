import express from 'express';
import dotenv from 'dotenv';
import { categoriesRoutes } from './routes/categories.routes';
import { specificationRoutes } from './routes/specifications.routes';

dotenv.config();

const app = express();

const port = 3333;

app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationRoutes);

app.listen(port, () => console.log(`server running at por ${port}`));