import React from 'react';
import cn from 'classnames';

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export function Toggler(props: Props) {
  return (
    <button
      className={cn('btn-toggler', props.isOpen && 'btn-toggler__open')}
      onClick={props.onClick}
    >
      <span className="sr-only">Expand</span>
    </button>
  );
}
