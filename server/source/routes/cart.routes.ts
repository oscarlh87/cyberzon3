import { Router } from 'express';
import {
  getCarts,
  getCartById,
  createCart,
  addProductToCart,
  removeProductFromCart,
  clearCart,
  updateCart,
  getUserCart,
} from '../controllers/cart.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getCarts);
//router.get('/:id', getCartById);
router.get('/userCart', verifyToken, getUserCart);
router.post('/create', verifyToken, createCart);
router.put('/update', verifyToken, updateCart);
router.delete('/clearCart/', verifyToken, clearCart);
router.put('/addProduct', addProductToCart);
router.put('/removeProduct', verifyToken, removeProductFromCart);

export default router;
