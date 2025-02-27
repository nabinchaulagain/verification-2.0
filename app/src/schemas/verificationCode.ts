import { z } from 'zod';

const verificationCodeSchema = z.array(z.string().regex(/^\d+$/)).length(6);

export default verificationCodeSchema;
