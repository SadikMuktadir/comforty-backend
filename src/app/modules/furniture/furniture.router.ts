import { Router } from 'express';
import { furnitureController } from './furniture.controller';
import { upload } from '../../utils/hosting/sendImageToCloudinary';

const furnitureRouter = Router();

furnitureRouter.post(
  '/create-furniture',
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  furnitureController.createFurniture,
);
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
