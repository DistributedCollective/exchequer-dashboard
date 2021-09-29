import React from 'react';

export function Select(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >,
) {
  return <select {...props} />;
}

Select.defaultProps = {};
