import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';
import verificationCodeSchema from '@/modules/verification/schemas';
import { extractFormErrorMessage } from '@/utils/validation';

export const verifyCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.body;
    const { success: isCodeValid, error } =
      await verificationCodeSchema.safeParseAsync(code);

    if (!isCodeValid) {
      return next(
        createError(StatusCodes.BAD_REQUEST, extractFormErrorMessage(error))
      );
    }

    res.status(StatusCodes.OK).json({ message: 'Verification successful' });
  } catch (error) {
    return next(error);
  }
};
