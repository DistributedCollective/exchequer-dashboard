import React, { useMemo } from 'react';
import { tokenBalanceFormatted } from '../../utils/helpers';

interface Props {
  balance: string;
  threshold: string;
  decimals: number;
}

export function BalanceRenderer(props: Props) {
  const diff = useMemo(() => {
    // todo change numbers to bignumber (if amounts received will be wei as currently expected)
    const a = Number(props.balance);
    const b = Number(props.threshold);
    const diff = ((a - b) / ((a + b) / 2)) * 100;
    return isNaN(diff) ? (a < b ? -100 : 100) : diff;
  }, [props]);

  const className = useMemo(() => {
    if (diff < 2) {
      return 'text-red';
    }

    if (diff < 10) {
      return 'text-yellow';
    }

    if (diff > 25) {
      return 'text-green';
    }

    return 'text-green text-opacity-50';
  }, [diff]);

  return (
    <span className={className} title={`Difference is ${diff.toFixed(2)} %.`}>
      {tokenBalanceFormatted(props.balance, 4, props.decimals)}
    </span>
  );
}
