import { Router } from 'express';

import {
  createProcessor,
  deleteProcessor,
  getProcessor,
  updatePartialProcessor,
  updateProcessor,
} from '../controllers/processor.controller';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getProcessor);
router.post('/', authorize('moderator'), createProcessor);
router.put('/:id', authorize('moderator'), updateProcessor);
router.patch('/:id', authorize('admin'), updatePartialProcessor);
router.delete('/:id', authorize('admin'), deleteProcessor);

export default router;
