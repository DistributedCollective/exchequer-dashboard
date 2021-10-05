import React from 'react';
import cn from 'classnames';
import { ReactComponent as IconExpand } from '../../assets/icon-expand.svg';

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
      <IconExpand className="w-5 h-5" />
      <span className="sr-only">Expand</span>
    </button>
  );
}
