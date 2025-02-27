export interface VerificationCodeInputProps {
  verificationCodeLength: number;
  verificationCode: string[];
  onChange: (value: string[]) => void;
  permittedKeysForVerificationCode: string[];
  errors: Record<number, string>;
}
