import React from 'react';

interface Props {
  label: string;
  children: React.ReactNode;
}

export function FormGroup(props: Props) {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      {props.children}
    </div>
  );
}
