import { Router } from 'express';

import { authorize } from '../middlewares/auth.middleware';
import { getCard, createCard, updatePartialCard, updateCard, deleteCard, getCardByID } from '../controllers/card.controller';

const router: Router = Router();

router.get('/', getCard);
router.get('/:id', getCardByID);
router.post('/',  createCard);
router.put('/:id',  updateCard);
router.patch('/:id', updatePartialCard);
router.delete('/:id', deleteCard);

export default router;
