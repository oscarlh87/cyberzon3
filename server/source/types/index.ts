import { Model } from 'mongoose';

import {
  IBrand,
  ICategory,
  IGraphic,
  IKeyboard,
  IMemory,
  IProcessor,
  IProduct,
  IRole,
  IScreen,
  ISoftware,
  IStorage,
  IUser,
} from '../interfaces/models.interface';

export type ModelType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  brand: Model<IBrand>;
  category: Model<ICategory>;
  graphic: Model<IGraphic>;
  keyboard: Model<IKeyboard>;
  memory: Model<IMemory>;
  processor: Model<IProcessor>;
  product: Model<IProduct>;
  role?: Model<IRole>;
  screen: Model<IScreen>;
  software: Model<ISoftware>;
  storage: Model<IStorage>;
  user?: Model<IUser>;
};
