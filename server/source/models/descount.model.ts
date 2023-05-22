import mongoose from 'mongoose';

export interface Idescount extends mongoose.Document {
  name: string;
  // other category schema fields
}

const descountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: Boolean, ref: 'Status', required: true,default: true },
});

const descount = mongoose.model<Idescount>('Descount', descountSchema);

export default descount;
