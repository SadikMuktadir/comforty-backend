import { Router } from 'express';
import { furnitureController } from './furniture.controller';

const furnitureRouter = Router();

furnitureRouter.post('/create-furniture', furnitureController.createFurniture);
furnitureRouter.get('/all-furniture', furnitureController.getFurniture);
furnitureRouter.get(
  '/all-furniture/:furnitureId',
  furnitureController.getSingleFurniture,
);
furnitureRouter.patch(
  '/update-furniture/:furnitureId',
  furnitureController.updateFurniture,
);
furnitureRouter.delete(
  '/delete-furniture/:furnitureId',
  furnitureController.deleteFurniture,
);

export default furnitureRouter;
