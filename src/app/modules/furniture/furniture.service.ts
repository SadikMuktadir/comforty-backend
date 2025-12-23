import { IFurniture } from './furniture.interface';
import Furniture from './furniture.model';

const createFurniture = async (payload: IFurniture) => {
  const result = await Furniture.create(payload);
  return result;
};

const getFurniture = async () => {
  const result = await Furniture.find();
  return result;
};

const getSingleFurniture = async (id: string) => {
  const result = await Furniture.findById(id);
  return result;
};

export const furnitureService = {
  createFurniture,
  getFurniture,
  getSingleFurniture,
};
