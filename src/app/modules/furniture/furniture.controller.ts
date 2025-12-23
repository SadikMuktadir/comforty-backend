import { Request, Response } from 'express';
import { furnitureService } from './furniture.service';

const createFurniture = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await furnitureService.createFurniture(payload, req?.file);
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
      message: 'Furniture is not get',
      error: error,
    });
  }
};
const getSingleFurniture = async (req: Request, res: Response) => {
  try {
    const furnitureId = req.params.furnitureId;
    const result = await furnitureService.getSingleFurniture(furnitureId);
    res.status(201).send({
      success: true,
      message: 'Single Furniture get Succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Single Furniture is not get',
      error: error,
    });
  }
};
const updateFurniture = async (req: Request, res: Response) => {
  try {
    const furnitureId = req.params.furnitureId;
    const body = req.body;
    const result = await furnitureService.updateFurniture(furnitureId, body);
    res.status(201).send({
      success: true,
      message: 'Furniture update Succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Furniture is not updated',
      error: error,
    });
  }
};
const deleteFurniture = async (req: Request, res: Response) => {
  try {
    const furnitureId = req.params.furnitureId;
    const result = await furnitureService.deleteFurniture(furnitureId);
    res.status(201).send({
      success: true,
      message: 'Furniture deleted Succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Furniture is not deleted',
      error: error,
    });
  }
};

export const furnitureController = {
  createFurniture,
  getFurniture,
  getSingleFurniture,
  updateFurniture,
  deleteFurniture,
};
