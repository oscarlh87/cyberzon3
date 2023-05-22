import { Router } from 'express';

import {
  createStorage,
  deleteStorage,
  getStorage,
  updatePartialStorage,
  updateStorage,
} from '../controllers/storage.controller';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getStorage);
router.post('/', authorize('moderator'), createStorage);
router.put('/:id', authorize('moderator'), updateStorage);
router.patch('/:id', authorize('admin'), updatePartialStorage);
router.delete('/:id', authorize('admin'), deleteStorage);

export default router;
