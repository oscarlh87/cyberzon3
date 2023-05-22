import { Router } from 'express';

import {
  createCategory,
  getCategory,
  updateCategory,
  updatePartialCategory,
  deleteCategory,
} from '../controllers/category.controller';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getCategory);
router.post('/', authorize('moderator'), createCategory);
router.put('/:id', authorize('moderator'), updateCategory);
router.patch('/:id', authorize('admin'), updatePartialCategory);
router.delete('/:id', authorize('admin'), deleteCategory);

export default router;
