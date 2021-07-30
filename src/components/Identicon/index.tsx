import React, { useMemo } from 'react';
import ReactIdenticon from 'react-identicons';
import cn from 'classnames';

type Size = 'sm' | 'lg';

interface Props {
  value: string;
  size: Size;
}

export function Identicon(props: Props) {
  const size = useMemo(() => {
    switch (props.size) {
      default:
      case 'sm':
        return 32;
      case 'lg':
        return 64;
    }
  }, [props.size]);

  return (
    <div className={cn("rounded-full overflow-hidden", props.size === 'sm' && 'w-8 h-8', props.size === 'lg' && 'w-16 h-16')}>
      <ReactIdenticon string={props.value} size={size} />
    </div>
  );
}

Identicon.defaultProps = {
  value: 'default text',
  size: 'sm',
};
