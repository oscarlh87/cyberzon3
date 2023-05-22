import { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware';
import { processPayment, getPreferenceId } from '../controllers/payment.controller';

import mercadopago from 'mercadopago';
mercadopago.configurations.setAccessToken('TEST-8996179535531122-050412-52fc66edac0f898f91560cf495c70482-672604099');

const router: Router = Router();

router.post('/preferenceId', getPreferenceId);
router.post('/process_payment', /*authorize('moderator'),*/ processPayment);

export default router;
