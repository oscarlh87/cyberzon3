import { Router } from 'express';

import {
  getMemory,
  createMemory,
  updateMemory,
  updatePartialMemory,
  deleteMemory,
} from '../controllers/memory.controller';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getMemory);
router.post('/', authorize('moderator'), createMemory);
router.put('/:id', authorize('moderator'), updateMemory);
router.patch('/:id', authorize('admin'), updatePartialMemory);
router.delete('/:id', authorize('admin'), deleteMemory);

export default router;
