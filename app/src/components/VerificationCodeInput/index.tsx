import React, { useCallback, useRef, useState } from 'react';
import { Backspace } from '@fluentui/keyboard-keys';
import { VerificationCodeInputProps } from '@/components/VerificationCodeInput/types';
import clsx from 'clsx';
import { toast } from 'react-toastify';

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  verificationCodeLength,
  verificationCode,
  onChange,
  permittedKeysForVerificationCode,
  errors,
}) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [inputsTouched, setInputsTouched] = useState<boolean[]>(() => {
    return Array.from({ length: verificationCodeLength }).map(() => false);
  });

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
        toast.error('Pasted code is invalid!')
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
  const handleBlur = useCallback(
    (index: number) => {
      if (inputsTouched[index]) {
        return;
      }

      setInputsTouched((inputsTouched) => {
        const newInputsTouched = [...inputsTouched];
        newInputsTouched[index] = true;

        return newInputsTouched;
      });
    },
    [inputsTouched]
  );

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: verificationCodeLength }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className={clsx(
            {
              'focus:border-red-500 border-red-300':
                Boolean(inputsTouched) && Boolean(errors[index]),
            },
            {
              'focus:border-teal-500 border-teal-300':
                !inputsTouched[index] || !errors[index],
            },
            'w-15 h-15 border border-gray-400 text-center text-2xl font-medium rounded caret-transparent focus:outline-none border-2 focus:border-3 '
          )}
          onKeyDown={(event) => handleKeydown(index, event)}
          onChange={handleInputChange}
          onPaste={(event) => handlePaste(index, event)}
          onBlur={() => {
            handleBlur(index);
          }}
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
