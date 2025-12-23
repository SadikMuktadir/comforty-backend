import { Request, Response } from 'express';
import { furnitureService } from './furniture.service';

const createFurniture = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await furnitureService.createFurniture(payload);
    res.status(201).send({
      success: true,
      message: 'Furniture Created Succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Furniture is not created',
      error: error,
    });
  }
};
const getFurniture = async (req: Request, res: Response) => {
  try {
    const result = await furnitureService.getFurniture();
    res.status(201).send({
      success: true,
      message: 'Furniture get Succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Furniture is not get created',
      error: error,
    });
  }
};

export const furnitureController = {
  createFurniture,
  getFurniture
};
