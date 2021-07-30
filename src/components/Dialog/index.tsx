import React, { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface DialogProps {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Dialog(props: DialogProps) {
  const [el, setElement] = useState<HTMLElement>();

  useLayoutEffect(() => {
    const modalRoot = document.body;
    const element = document.createElement('div');
    modalRoot.appendChild(element);
    setElement(element);
    return () => {
      modalRoot.removeChild(element);
    };
  }, []);

  useLayoutEffect(() => {
    if (props.isOpen) {
      document.body.classList.add('dialog-open');
    } else {
      document.body.classList.remove('dialog-open');
    }
  }, [props.isOpen]);

  if (el) {
    // todo: implement transitions.
    return createPortal(
      props.isOpen && (
        <div className="dialog-wrapper">
          <div className="dialog--backdrop" />
          <div className="container relative">
            <div className="dialog--container">
              <div className="dialog">{props.children}</div>
            </div>
          </div>
        </div>
      ),
      el,
    );
  }

  return null;
}
