import { ZodError } from 'zod';

export const extractFormErrorMessage = (error: ZodError): string => {
  return error.flatten().formErrors[0];
};
