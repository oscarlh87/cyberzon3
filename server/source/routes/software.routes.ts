import { Router } from 'express';

import {
  createSoftware,
  deleteSoftware,
  getSoftware,
  updatePartialSoftware,
  updateSoftware,
} from '../controllers/software.controller';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getSoftware);
router.post('/', authorize('moderator'), createSoftware);
router.put('/:id', authorize('moderator'), updateSoftware);
router.patch('/:id', authorize('admin'), updatePartialSoftware);
router.delete('/:id', authorize('admin'), deleteSoftware);

export default router;
