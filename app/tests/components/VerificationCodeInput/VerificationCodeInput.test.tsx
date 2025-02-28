import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import VerificationCodeInput from '@/components/VerificationCodeInput';
import { Backspace } from '@fluentui/keyboard-keys';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    default: vi.fn(),
  },
}));

describe('VerificationCodeInput', () => {
  const defaultProps = {
    verificationCodeLength: 6,
    verificationCode: ['', '', '', '', '', ''],
    onChange: vi.fn(),
    permittedKeysForVerificationCode: [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ],
    errors: [false, false, false, false, false, false],
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render correct number of input fields', () => {
    render(<VerificationCodeInput {...defaultProps} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('should set verification code when valid character is pressed', () => {
    const mockOnChange = vi.fn();
    const expectedNewCode = ['1', '', '', '', '', ''];
    render(<VerificationCodeInput {...defaultProps} onChange={mockOnChange} />);
    const firstDigitCode = screen.getAllByRole('textbox')[0];
    fireEvent.keyDown(firstDigitCode, {
      key: '1',
    });

    expect(mockOnChange).toHaveBeenCalledWith(expectedNewCode);
  });

  it('should shift focus onto the next input field once a key is pressed', () => {
    render(<VerificationCodeInput {...defaultProps} />);
    const inputs = screen.getAllByRole('textbox');

    inputs.forEach((input) => {
      vi.spyOn(input, 'focus');
    });

    fireEvent.keyDown(inputs[0], { key: '1' });

    expect(inputs[1].focus).toHaveBeenCalledOnce();
  });

  it('should ignore invalid characters', () => {
    const mockOnChange = vi.fn();
    render(<VerificationCodeInput {...defaultProps} onChange={mockOnChange} />);
    const inputs = screen.getAllByRole('textbox');

    fireEvent.keyDown(inputs[0], { key: 's' });

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should remove focused character when backspace key is pressed', () => {
    const verificationCode = ['1', '0', '3', '3', '7', '9'];
    const expectedVerificationCode = ['1', '0', '3', '3', '7', ''];
    const mockOnChange = vi.fn();
    render(
      <VerificationCodeInput
        {...defaultProps}
        verificationCode={verificationCode}
        onChange={mockOnChange}
      />
    );

    const lastDigitCodeInput = screen.getAllByRole('textbox')[5];

    fireEvent.keyDown(lastDigitCodeInput, { key: Backspace });
    expect(mockOnChange).toHaveBeenCalledExactlyOnceWith(
      expectedVerificationCode
    );
  });

  it('should handle paste event with valid characters', async () => {
    const mockOnChange = vi.fn();
    const clipboardData = {
      getData: vi.fn().mockReturnValue('123456'),
    };
    const expectedVerificationCode = ['1', '2', '3', '4', '5', '6'];

    render(<VerificationCodeInput {...defaultProps} onChange={mockOnChange} />);

    const firstDigitCodeInput = screen.getAllByRole('textbox')[0];

    fireEvent.paste(firstDigitCodeInput, { clipboardData });

    expect(mockOnChange).toHaveBeenCalledExactlyOnceWith(
      expectedVerificationCode
    );
  });

  it('should ignore paste event with at partially invalid characters', () => {
    const mockOnChange = vi.fn();
    const clipboardData = {
      getData: vi.fn().mockReturnValue('x23456'),
    };

    render(<VerificationCodeInput {...defaultProps} onChange={mockOnChange} />);

    const firstDigitCodeInput = screen.getAllByRole('textbox')[0];

    fireEvent.paste(firstDigitCodeInput, { clipboardData });

    expect(mockOnChange).toHaveBeenCalledTimes(0);
  });
});
