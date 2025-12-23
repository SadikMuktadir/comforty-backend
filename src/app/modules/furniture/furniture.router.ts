import { Router } from 'express';
import { furnitureController } from './furniture.controller';

const furnitureRouter = Router();

furnitureRouter.post('/create-furniture', furnitureController.createFurniture);
furnitureRouter.get('/all-furniture', furnitureController.getFurniture);
furnitureRouter.get(
  '/all-furniture/:furnitureId',
  furnitureController.getSingleFurniture,
);

export default furnitureRouter;
