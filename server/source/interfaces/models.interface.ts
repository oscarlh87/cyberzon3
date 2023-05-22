import { Document, Types } from 'mongoose';

export interface IBrand extends Document {
  name: string;
}
export interface ICard extends Document {
  name: string;
  client: IUser['_id'];
  product: IProduct['_id'];
  cant: number;
  p_unit: number;
  p_subtotal: number;
  p_total: number;
  tax: number;
  // status: boolean;
}

export interface IConfig extends Document {
  name: string;
  showSlider: boolean;
}
export interface IComentary extends Document {
  client: IUser['_id'];
  product: IProduct['_id'];
  order: IProduct['_id'];
  name: string;
  state: boolean;
}

export interface ISlider extends Document {
  name: string;
}
export interface ITax extends Document {
  name: string;
}

export interface ICategory extends Document {
  name: string;
}

export interface IGraphic extends Document {
  name: string;
}

export interface IKeyboard extends Document {
  name: string;
}

export interface IMemory extends Document {
  name: string;
}

export interface IProcessor extends Document {
  name: string;
}

export interface IScreen extends Document {
  name: string;
}

export interface ISoftware extends Document {
  name: string;
}

export interface IStorage extends Document {
  name: string;
}
export interface INewletter extends Document {
  email: string;
  state: boolean;
}

export interface IImage extends Document {
  url: string;
  secure_url: string;
  public_id: string;
}

export interface IProduct extends Document {
  name: string;
  code: string;
  model: string;
  description: string;
  price: number;
  image: Types.DocumentArray<IImage>;
  stock: number;
  memory: IMemory['_id'];
  category: ICategory['_id'];
  graphic: IGraphic['_id'];
  keyboard: IKeyboard['_id'];
  processor: IProcessor['_id'];
  brand: IBrand['_id'];
  screen: IScreen['_id'];
  software: ISoftware['_id'];
  storage: IStorage['_id'];
  status: boolean;
  score: number;
}

export interface IRole extends Document {
  name: string;
  access: string[];
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  avatar: string;
  role: IRole['_id'];
  active: boolean;
}

export interface IOrderItem extends Document {
  product: IProduct['_id'];
  quantity: number;
}

export interface IBuyerData extends Document {
  name: string;
  lastname: string;
  phone: string;
  company: string;
  email: string;
  country: string;
  state: string;
  city: string;
  street: string;
  cp: string;
}

export interface IOrder extends Document {
  client: IUser['_id'];
  items: Types.DocumentArray<IOrderItem>;
  status: string;
  token: string;
  subtotal: number;
  total: number;
  installments: number;
  paymentMethodId: string;
  // Buyer data
  buyerData: IBuyerData;
}

export interface ICart extends Document {
  client: IUser['_id'];
  items: Types.DocumentArray<IOrderItem>;
  subTotal: number;
  total: number;
}

export interface IFavorite extends Document {
  user: IUser['_id'];
  product: IProduct['_id'];
}
