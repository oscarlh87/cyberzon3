import { Router } from 'express';

import { authLogin, getGoogleOauthToken } from '../controllers/auth.controller';

const router: Router = Router();

router.post('/login', authLogin);
router.post('/auth', getGoogleOauthToken);

export default router;
