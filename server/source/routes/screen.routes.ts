import { Router } from 'express';

//import { authorize  from '../middlewares/auth.middleware';
import {
  createScreen,
  deleteScreen,
  getScreen,
  updatePartialScreen,
  updateScreen,
} from '../controllers/screen.controller';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getScreen);
router.post('/', authorize('moderator'), createScreen);
router.put('/:id', authorize('moderator'), updateScreen);
router.patch('/:id', authorize('admin'), updatePartialScreen);
router.delete('/:id', authorize('admin'), deleteScreen);

export default router;
