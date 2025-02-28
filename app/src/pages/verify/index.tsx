import Button from '@/components/Button';
import VerificationCodeInput from '@/components/VerificationCodeInput';
import { useVerifyCode } from '@/hooks/verification/useVerifyCode';
import {
  permittedKeysForVerificationCode,
  verificationCodeLength,
} from '@/pages/verify/constants';
import verificationCodeSchema from '@/schemas/verificationCode';
import { getFieldErrors } from '@/utils/validation';
import { useCallback, useMemo, useState } from 'react';

const VerifyPage = () => {
  const [verficationCode, setVerficationCode] = useState<string[]>(
    Array(verificationCodeLength)
  );
  const { verficationCodeErrors, hasNoVerificationCodeErrors } = useMemo(() => {
    const verificationCodeFieldErrors = getFieldErrors(
      verificationCodeSchema,
      verficationCode
    );
    return {
      verficationCodeErrors: verificationCodeFieldErrors,
      hasNoVerificationCodeErrors:
        Object.keys(verificationCodeFieldErrors).length === 0,
    };
  }, [verficationCode]);
  const { mutate: verifyCode, isPending: isVerificationPending } =
    useVerifyCode();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      verifyCode(verficationCode.join(''));
    },
    [verifyCode, verficationCode]
  );

  return (
    <form
      className="mt-8 w-md p-6 mx-auto text-center border border-gray-300 rounded-lg bg-gray-50 shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4 text-lg">Enter your verification code</h2>
      <div className="mx-auto">
        <VerificationCodeInput
          verificationCodeLength={verificationCodeLength}
          verificationCode={verficationCode}
          onChange={setVerficationCode}
          permittedKeysForVerificationCode={permittedKeysForVerificationCode}
          errors={verficationCodeErrors}
        />
      </div>
      <div className="mt-4">
        <Button
          variant="info"
          type="submit"
          isDisabled={!hasNoVerificationCodeErrors || isVerificationPending}
        >
          {isVerificationPending ? 'Verifying...' : 'Verify'}
        </Button>
      </div>
    </form>
  );
};

export default VerifyPage;
