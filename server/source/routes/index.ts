import { Router } from 'express';

import authRoutes from './auth.routes';
import brandRoutes from './brand.routes';
import categoryRoutes from './category.routes';
import errorHandler from '../middlewares/errorHandler.middleware';
import graphicRoutes from './graphic.routes';
import keyboardRoutes from './keyboard.routes';
import memoryRoutes from './memory.routes';
import processorRoutes from './processor.routes';
import productRoutes from './product.routes';
import roleRoutes from './role.routes';
import screenRoutes from './screen.routes';
import softwareRoutes from './software.routes';
import storageRoutes from './storage.routes';
import userRoutes from './users.routes';
import sliderRoutes from './slider.routes';
import cartRoutes from './cart.routes';
import paymentRoutes from './payment.routes';
import orderRoutes from './order.routes';
import cardRoutes from './card.routes';
import taxRoutes from './tax.routes';
import configRoutes from './config.routes';
import comentaryRoutes from './comentary.routes';
import newletterRoutes from './newletter.routes';
import favoriteRoutes from './favorite.routes';

const server: Router = Router();

server.use('/payment', paymentRoutes);
server.use('/orders', orderRoutes);
server.use('/cart', cartRoutes);
server.use('/auth', authRoutes);
server.use('/brand', brandRoutes);
server.use('/category', categoryRoutes);
server.use('/graphic', graphicRoutes);
server.use('/keyboard', keyboardRoutes);
server.use('/memory', memoryRoutes);
server.use('/processor', processorRoutes);
server.use('/product', productRoutes);
server.use('/role', roleRoutes);
server.use('/screen', screenRoutes);
server.use('/software', softwareRoutes);
server.use('/storage', storageRoutes);
server.use('/sliders', sliderRoutes);
server.use('/user', userRoutes);
server.use('/card', cardRoutes);
server.use('/tax', taxRoutes);
server.use('/config', configRoutes);
server.use('/comentary', comentaryRoutes);
server.use('/news', newletterRoutes);
server.use('/favorite', favoriteRoutes);

// Error Management Middleware
server.use(errorHandler);

export default server;
