import React, { useCallback, useRef } from 'react';
import { Backspace } from '@fluentui/keyboard-keys';
import { VerificationCodeInputProps } from '@/components/VerificationCodeInput/types';

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  verificationCodeLength,
  verificationCode,
  onChange,
  permittedKeysForVerificationCode,
}) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleBackspacePress = useCallback(
    (index: number) => {
      const newVerficationCode = [...verificationCode];
      newVerficationCode[index] = '';
      onChange(newVerficationCode);
    },
    [onChange, verificationCode]
  );

  const handleKeydown = useCallback(
    (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === Backspace) {
        handleBackspacePress(index);
        return;
      }

      if (!permittedKeysForVerificationCode.includes(event.key)) {
        return;
      }

      const inputValue = event.key;
      const newVerficationCode = [...verificationCode];

      newVerficationCode[index] = inputValue;

      onChange(newVerficationCode);

      const nextInput = inputsRef.current[index + 1];

      if (!nextInput) {
        inputsRef.current[index]?.blur();
        return;
      }

      if (inputValue && nextInput) {
        nextInput.focus();
      }
    },
    [
      handleBackspacePress,
      onChange,
      verificationCode,
      permittedKeysForVerificationCode,
    ]
  );

  const handlePaste = useCallback(
    (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();

      const pastedData = event.clipboardData.getData('text');
      const hasInvalidCharacter = pastedData
        .split('')
        .some((char) => !permittedKeysForVerificationCode.includes(char));

      if (hasInvalidCharacter) {
        // TODO: Toast a error message here.
        return;
      }

      const newVerificationCode = [...verificationCode];

      for (let i = 0; i < pastedData.length; i++) {
        if (i + index >= inputsRef.current.length) {
          continue;
        }

        newVerificationCode[i + index] = pastedData[i];
      }

      onChange(newVerificationCode);

      const nextInput = inputsRef.current[index + pastedData.length];

      if (!nextInput) {
        return;
      }

      nextInput.focus();
    },
    [onChange, verificationCode, permittedKeysForVerificationCode]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
    },
    []
  );

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: verificationCodeLength }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="w-15 h-15 border border-gray-400 text-center text-2xl font-medium rounded caret-transparent"
          onKeyDown={(event) => handleKeydown(index, event)}
          onChange={handleInputChange}
          onPaste={(event) => handlePaste(index, event)}
          ref={(ref) => {
            if (!ref) {
              return;
            }

            inputsRef.current[index] = ref;
          }}
          value={verificationCode[index] ?? ''}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
