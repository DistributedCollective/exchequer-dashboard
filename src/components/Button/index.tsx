import React from 'react';
import cn from 'classnames';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
}

export function Button({ text, className, primary, secondary, ...props }: Props) {
  return (
    <button {...props} className={cn(secondary && 'btn-secondary', primary && 'btn-primary', className)}>{text}</button>
  );
}

Button.defaultProps = {
  primary: false,
  secondary: false,
};
