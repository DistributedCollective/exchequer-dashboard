import React from 'react';
import cn from 'classnames';

type Props = { label: React.ReactNode } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Checkbox({ type, label, className, ...props }: Props) {
  return (
    <label className="form-group checkbox-group">
      <input
        type="checkbox"
        className={cn('checkbox-input', className)}
        {...props}
      />
      <span className="checkbox-label">{label}</span>
    </label>
  );
}

Checkbox.defaultProps = {};
