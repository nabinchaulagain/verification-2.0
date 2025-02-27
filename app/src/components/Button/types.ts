import { variantStyles } from '@/components/Button/styles';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: keyof typeof variantStyles;
  isDisabled?: boolean;
}
