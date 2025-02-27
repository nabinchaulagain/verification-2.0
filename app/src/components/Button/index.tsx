import {
  baseStyles,
  disabledStyles,
  variantStyles,
} from '@/components/Button/styles';
import { ButtonProps } from '@/components/Button/types';
import clsx from 'clsx';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  isDisabled = false,
  ...otherProps
}) => {
  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], {
        [disabledStyles]: isDisabled,
      })}
      onClick={!isDisabled ? onClick : undefined}
      type={type}
      disabled={isDisabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
