import { model, Schema } from 'mongoose';
import { IFurniture } from './furniture.interface';

const furnitureSchema = new Schema<IFurniture>(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Furniture = model<IFurniture>('Furniture', furnitureSchema);

export default Furniture;
