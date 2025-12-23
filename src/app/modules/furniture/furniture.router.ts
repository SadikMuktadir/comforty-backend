import { Router } from 'express';
import { furnitureController } from './furniture.controller';

const furnitureRouter = Router();

furnitureRouter.post('/create-furniture', furnitureController.createFurniture);

export default furnitureRouter;
