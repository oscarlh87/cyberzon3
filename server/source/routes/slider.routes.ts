import { Router } from 'express';

import {
  getSlider,
  createSlider,
  updatePartialSlider,
  updateSlider,
  deleteSlider,
} from '../controllers/slider.controller';

const router: Router = Router();

router.get('/', getSlider);
router.post('/', createSlider);
router.put('/:id', updateSlider);
router.patch('/:id', updatePartialSlider);
router.delete('/:id', deleteSlider);

export default router;
