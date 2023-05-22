import { Router } from 'express';

import {
  getFavorites,
  createFavorite,
  deleteFavorite,
  deleteFavorites,
  createFavorites,
  sinchronizeFavorites,
  deleteAllFavorites,
} from '../controllers/favorite.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', verifyToken, getFavorites);
router.post('/create', verifyToken, createFavorite);
router.post('/createMany', verifyToken, createFavorites);
router.put('/synchronize', verifyToken, sinchronizeFavorites);
router.delete('/delete', verifyToken, deleteFavorite);
router.delete('/deleteMany', verifyToken, deleteFavorites);
router.delete('/deleteAll', verifyToken, deleteAllFavorites);

export default router;
