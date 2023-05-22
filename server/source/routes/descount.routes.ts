import express, { Router } from 'express';
import {
  getDescount,
  createDescount,
  updatePartialDescount,
  updateDescount,
  deleteDescount,
} from '../controllers/descount.controller';

const router: Router = express.Router();

router.get('/', getDescount);
router.post('/', createDescount);
router.put('/:id', updateDescount);
router.patch('/:id', updatePartialDescount);
router.delete('/:id', deleteDescount);

export default router;
