import { Router } from 'express';

import { getOrders, getOrderById, createOrder, updateOrder, getOrderByClient } from '../controllers/order.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getOrders);
router.post('/create', verifyToken, createOrder);
router.put('/update/:id', verifyToken, updateOrder);
router.get('/byUser', verifyToken, getOrderByClient);
router.get('/:id', getOrderById);

export default router;
