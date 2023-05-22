import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

import { IFavorite } from '../interfaces/models.interface';

const favoriteSchema = new Schema<IFavorite>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  },
  { timestamps: true },
);

const Favorite = model<IFavorite>('Favorite', favoriteSchema);

export default Favorite;
