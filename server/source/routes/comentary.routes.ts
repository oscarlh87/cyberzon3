import { Router } from 'express';

import {
  getComentary,
  createComentary,
  updatePartialComentary,
  updateComentary,
  deleteComentary,
} from '../controllers/comentary.controller';
import { authorize, verifyToken } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getComentary);
router.post('/', verifyToken, createComentary);
router.put('/:id', authorize('moderator'), updateComentary);
router.patch('/:id', authorize('admin'), updatePartialComentary);
router.delete('/:id', authorize('admin'), deleteComentary);

export default router;
