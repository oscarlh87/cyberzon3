import { Router } from 'express';

import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updatePartialUser,
  deleteUser,
  getUserByID,
  changePassword,
} from '../controllers/users.controller';
import { authorize, verifyToken } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/user', verifyToken, getUser);
router.patch('/user/change', verifyToken, changePassword);
router.get('/:id', authorize('moderator'), getUserByID);
router.get('/', authorize('moderator'), getUsers);
router.post('/', createUser);
router.put('/:id', authorize('moderator'), updateUser);
router.patch('/:id', authorize('admin'), updatePartialUser);
router.delete('/:id', authorize('admin'), deleteUser);

export default router;
