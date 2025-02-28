import {
  FINAL_DIGIT_IN_VERIFICATION_CODE,
  VERIFICATION_CODE_LENGTH,
  VERIFICATION_CODE_PATTERN,
} from '@/modules/verification/constants.js';
import { z } from 'zod';

const verificationCodeSchema = z
  .string({
    message: 'Verification code is required',
  })
  .length(
    VERIFICATION_CODE_LENGTH,
    `Code must be exactly ${VERIFICATION_CODE_LENGTH} digits long`
  )
  .regex(VERIFICATION_CODE_PATTERN, 'Code must be numeric')
  .refine(
    (code) =>
      code[VERIFICATION_CODE_LENGTH - 1] === FINAL_DIGIT_IN_VERIFICATION_CODE,
    {
      message: 'Invalid code',
    }
  );

export default verificationCodeSchema;
