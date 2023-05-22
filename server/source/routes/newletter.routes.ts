import { Router } from 'express';

import { authorize } from '../middlewares/auth.middleware';
import { getNewletter, createNewletter, updatePartialNewletter, updateNewletter, deleteNewletter } from '../controllers/newletter.controller';

const router: Router = Router();

router.get('/', getNewletter);
router.post('/',  createNewletter);
router.put('/:id',  updatePartialNewletter);
router.patch('/:id', updateNewletter);
router.delete('/:id', deleteNewletter);

export default router;
