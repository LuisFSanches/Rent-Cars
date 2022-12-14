import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationRoutes } from './specifications.routes';
import { usersRoutes } from './user.routes';
import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", usersRoutes);
router.use("/", authenticateRoutes);
router.use("/cars", carsRoutes);

export { router };