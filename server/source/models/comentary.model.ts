import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

import { IComentary } from '../interfaces/models.interface';

const comentarySchema = new Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    name: { type: String, unique: false, index: false },
    descripcion: { type: String, required: true },
    score: {
      type: Number,
      ref: 'Score',
      required: true,
      validate: {
        validator: function (v: number) {
          return v >= 0 && v <= 5;
        },
        message: 'El puntaje debe estar entre 0 y 5.',
      },
    },
    state: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Comentary = model<IComentary>('Comentary', comentarySchema);
Comentary.collection.dropIndexes();

export default Comentary;
