/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { useRef, MouseEvent } from 'react';
import styles from './modal.module.scss';

type ModalProps = {
  children: any;
  showing: boolean;
  onRequestToClose: () => void;
};

export default function Modal({ showing, children, onRequestToClose }: ModalProps) {
  if (!showing) { return null; }
  const backgroundRef = useRef<HTMLDivElement>(null);
  const handleClick = (e: MouseEvent<Element>) => {
    if (e.target === backgroundRef.current) {
      onRequestToClose();
    }
  };
  return (
    <div
      onClick={handleClick}
      ref={backgroundRef}
      className={styles.background}
    >
      <div className={styles.modal}>
        <button onClick={() => onRequestToClose()} type="button" className={styles.closeButton}>
          <img src="/icons/close.svg" alt="close" />
        </button>
        {children}
      </div>
    </div>
  );
}
