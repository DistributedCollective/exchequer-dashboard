import React, { useState, ReactNode } from 'react';
import styles from './index.module.css';

interface Props {
  children: ReactNode;
  message: string;
  position: 'bottom' | 'top' | 'left' | 'right';
}

export function Tooltip(props: Props) {
  const [displayTooltip, setDisplayTooltip] = useState<boolean>(false);
  const hideTooltip = () => {
    setDisplayTooltip(false);
  };
  const showTooltip = () => {
    setDisplayTooltip(true);
  };

  return (
    <span className={styles.tooltip} onMouseLeave={hideTooltip}>
      {displayTooltip && (
        <div className={`${styles.bubble} ${styles[props.position]}`}>
          <div className={styles.message}>{props.message}</div>
        </div>
      )}
      <span className={styles.trigger} onMouseOver={showTooltip}>
        {props.children}
      </span>
    </span>
  );
}
