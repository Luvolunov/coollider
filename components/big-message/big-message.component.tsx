import React from 'react';
import classNames from 'classnames';
import styles from './big-message.module.scss';

type BigMessageProps = {
  children: any;
  showing: boolean;
  onClose: () => void;
};

export default function BigMessage({ children, showing, onClose }: BigMessageProps) {
  const messageClasses = classNames(styles.message, { [styles.showed]: showing });
  return (
    <div className={messageClasses}>
      <button className={styles.closeButton} type="button" onClick={onClose}>
        <img src="/icons/close.svg" alt="close" />
      </button>
      {children}
    </div>
  );
}
