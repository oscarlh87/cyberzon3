import bcrypt from 'bcrypt';

import { Schema, model } from 'mongoose';

import { IUser } from '../interfaces/models.interface';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    active: { type: Boolean, required: true, default: true },
    country: { type: String, required: false },
    phone: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    street: { type: String, required: false },
    cp: { type: String, required: false },
    company: { type: String, required: false },
  },
  { timestamps: true },
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

export default model<IUser>('User', userSchema);
