import { IFurniture } from './furniture.interface';
import Furniture from './furniture.model';

const createFurniture = async (payload: IFurniture) => {
  const result =await Furniture.create(payload);
  return result;
};

export const furnitureService = {
  createFurniture,
};
