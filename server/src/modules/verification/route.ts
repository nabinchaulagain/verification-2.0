import { Router } from 'express';
import * as verificationController from '@/modules/verification/controller';

const router = Router();

router.post('/verify', verificationController.verifyCode);

export default router;
