import { Router } from 'express';

import {
  getGraphic,
  createGraphic,
  updatePartialGraphic,
  updateGraphic,
  deleteGraphic,
} from '../controllers/graphic.controller';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getGraphic);
router.post('/', authorize('moderator'), createGraphic);
router.put('/:id', authorize('moderator'), updateGraphic);
router.patch('/:id', authorize('admin'), updatePartialGraphic);
router.delete('/:id', authorize('admin'), deleteGraphic);

export default router;
