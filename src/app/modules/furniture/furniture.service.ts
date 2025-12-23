import { sendImageToCloudinary } from '../../utils/hosting/sendImageToCloudinary';
import { IFurniture } from './furniture.interface';
import Furniture from './furniture.model';

const createFurniture = async (payload: IFurniture, file: any) => {
  let imageUrl;
  if (file) {
    const imageName = `${payload?.name}`;
    const path = file?.path;
    const uploadImage = await sendImageToCloudinary(imageName, path);
    imageUrl = uploadImage?.secure_url;
  }
  const furnitureData = { ...payload, image: imageUrl };
  const result = await Furniture.create(furnitureData);
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

const updateFurniture = async (id: string, data: IFurniture) => {
  const result = await Furniture.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const deleteFurniture = async (id: string) => {
  const result = await Furniture.findByIdAndDelete(id);
  return result;
};

export const furnitureService = {
  createFurniture,
  getFurniture,
  getSingleFurniture,
  updateFurniture,
  deleteFurniture,
};
