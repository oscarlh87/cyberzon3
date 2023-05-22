import { Router } from 'express';

import { getTax, createTax, updatePartialTax, updateTax, deleteTax } from '../controllers/tax.controller';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getTax);
router.post('/', authorize('moderator'), createTax);
router.put('/:id', authorize('moderator'), updateTax);
router.patch('/:id', authorize('admin'), updatePartialTax);
router.delete('/:id', authorize('admin'), deleteTax);

export default router;
