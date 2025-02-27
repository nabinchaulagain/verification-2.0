import Button from '@/components/Button';
import VerificationCodeInput from '@/components/VerificationCodeInput';
import {
  permittedKeysForVerificationCode,
  verificationCodeLength,
} from '@/pages/verify/constants';
import { useState } from 'react';

const VerifyPage = () => {
  const [verficationCode, setVerficationCode] = useState<string[]>([]);

  return (
    <form className="mt-4 text-center">
      <div className="mx-auto">
        <VerificationCodeInput
          verificationCodeLength={verificationCodeLength}
          verificationCode={verficationCode}
          onChange={setVerficationCode}
          permittedKeysForVerificationCode={permittedKeysForVerificationCode}
        />
      </div>
      <div className="mt-4">
        <Button variant="info" isDisabled>
          Verify
        </Button>
      </div>
    </form>
  );
};

export default VerifyPage;
