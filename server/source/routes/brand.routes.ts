import { Router } from 'express';

import { getBrand, createBrand, updatePartialBrand, updateBrand, deleteBrand } from '../controllers/brand.controller';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getBrand);
router.post('/', authorize('moderator'), createBrand);
router.put('/:id', authorize('moderator'), updateBrand);
router.patch('/:id', authorize('admin'), updatePartialBrand);
router.delete('/:id', authorize('admin'), deleteBrand);

export default router;
