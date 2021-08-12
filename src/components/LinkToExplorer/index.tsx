import React, { useMemo } from 'react';
import { explorers } from '../../utils/explorers';

type Type = 'address' | 'tx';

interface Props {
  value: string;
  type: Type;
  chainId: number;
}

export function LinkToExplorer(props: Props) {
  const url = useMemo(() => {
    const explorer = explorers[props.chainId] || '';
    return `${explorer}/${props.type === 'address' ? 'address' : 'tx'}/${
      props.value
    }`;
  }, [props]);
  return (
    <a
      href={url}
      className="truncate hover:underline"
      target="_blank"
      rel="noreferrer noopener"
    >
      {props.value}
    </a>
  );
}

LinkToExplorer.defaultProps = {
  chainId: 30,
  type: 'address',
};
