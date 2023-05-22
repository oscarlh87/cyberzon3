import { Router } from 'express';

import { getRole, createRole, updateRole, updatePartialRole, deleteRole } from '../controllers/role.controller';
import { authorize, verifyToken } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', verifyToken, getRole);
router.post('/', authorize('moderator'), createRole);
router.put('/:id', authorize('moderator'), updateRole);
router.patch('/:id', authorize('admin'), updatePartialRole);
router.delete('/:id', authorize('admin'), deleteRole);

export default router;
