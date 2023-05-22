import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/models.interface';

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    code: { type: String, required: false },
    model: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    image: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        secure_url: { type: String, required: true },
      },
    ],

    // image: {
    //   type: [
    //     {
    //       url: { type: String, required: true },
    //       public_id: { type: String, required: true },
    //       secure_url: { type: String, required: true },
    //     },
    //   ],
    //   required: true,
    //   validate: {
    //     validator: function (value: any) {
    //       // return (
    //       //   value &&
    //       //   Array.isArray(value) &&
    //       //   value.every(
    //       //     (item: any) =>
    //       //       typeof item === 'object' &&
    //       //       item.url &&
    //       //       item.public_id &&
    //       //       typeof item.url === 'string' &&
    //       //       typeof item.public_id === 'string',
    //       //   )
    //       // );
    //       return true;
    //     },
    //     message: 'Debe proporcionar una imagen válida',
    //   },
    // },

    stock: { type: Number },
    memory: { type: mongoose.Schema.Types.ObjectId, ref: 'Memory', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    graphic: { type: mongoose.Schema.Types.ObjectId, ref: 'Graphic', required: true },
    keyboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Keyboard', required: true },
    processor: { type: mongoose.Schema.Types.ObjectId, ref: 'Processor', required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    screen: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
    software: { type: mongoose.Schema.Types.ObjectId, ref: 'Software', required: true },
    storage: { type: mongoose.Schema.Types.ObjectId, ref: 'Storage', required: true },
    status: { type: Boolean, required: true, default: true },
    score: {
      type: Number,
      ref: 'Score',
      required: false,
      validate: {
        validator: function (v: number) {
          return v >= 0 && v <= 5;
        },
        message: 'El puntaje debe estar entre 0 y 5.',
      },
    },
  },
  { timestamps: true },
);

export default model<IProduct>('Product', productSchema);
