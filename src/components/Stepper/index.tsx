import React, { useMemo } from 'react';
import cn from 'classnames';

interface Props {
  value: number;
  count: number;
}

export function Stepper(props: Props) {
  const items = useMemo(
    () =>
      Array.from(Array(props.count).keys()).map((item, index) => ({
        value: index,
        selected: index === props.value - 1,
      })),
    [props.count, props.value],
  );
  return (
    <div className="flex flex-row justify-between items-center space-x-2">
      {items.map(item => (
        <div
          key={item.value}
          className={cn(
            'h-1 w-full bg-yellow transition duration-300',
            !item.selected && 'bg-opacity-25',
          )}
        />
      ))}
    </div>
  );
}

Stepper.defaultProps = {
  value: 1,
  count: 2,
};
