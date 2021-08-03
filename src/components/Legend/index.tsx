import React from 'react';
import cn from 'classnames';

interface Props {
  title: React.ReactNode;
  className?: string;
  rightElement?: React.ReactNode;
}

export function Legend(props: Props) {
  return (
    <div
      className={cn(
        'flex flex-row items-center space-x-4 justify-between',
        props.className,
      )}
    >
      <div className="h-0.5 bg-light w-16 rounded-full" />
      <div className="px-4 whitespace-nowrap">{props.title}</div>
      <div className="h-0.5 bg-light w-full rounded-full" />
      {props.rightElement && (
        <div className="px-4 whitespace-nowrap">{props.rightElement}</div>
      )}
    </div>
  );
}

Legend.defaultProps = {
  className: 'my-2',
};
