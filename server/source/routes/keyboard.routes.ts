import { Router } from 'express';

import {
  createKeyboard,
  deleteKeyboard,
  getKeyboard,
  updateKeyboard,
  updatePartialKeyboard,
} from '../controllers/keyboard.controller';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getKeyboard);
router.post('/', authorize('moderator'), createKeyboard);
router.put('/:id', authorize('moderator'), updateKeyboard);
router.patch('/:id', authorize('admin'), updatePartialKeyboard);
router.delete('/:id', authorize('admin'), deleteKeyboard);

export default router;
