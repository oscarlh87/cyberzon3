import { Router } from 'express';

import { getConfig, createConfig, updatePartialConfig, updateConfig, deleteConfig } from '../controllers/config.controller';
import { authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', getConfig);
router.post('/', createConfig);
router.put('/:id', updateConfig);
router.patch('/:id', updatePartialConfig);
router.delete('/:id',  deleteConfig);

export default router;
