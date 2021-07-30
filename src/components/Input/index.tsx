import React from 'react';

export function Input(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) {
  return <input {...props} />;
}

Input.defaultProps = {};
