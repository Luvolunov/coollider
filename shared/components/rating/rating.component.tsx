/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent } from 'react';
import styles from './rating.module.scss';

type RatingProps = {
  onChange?: (value: number) => void,
};

export default function Rating({ onChange }: RatingProps) {
  const rates = [1, 2, 3, 4, 5];
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) { return; }
    onChange(+event.target.value);
  };
  return (
    <div className={styles.container}>
      {
        rates.map((rate) => (
          <React.Fragment key={`rate-${rate}`}>
            <input onChange={changeHandler} id={`rate-${rate}`} name="rate" className={styles.input} type="radio" value={6 - rate} />
            <label htmlFor={`rate-${rate}`} className={styles.star} />
          </React.Fragment>
        ))
      }
    </div>
  );
}

Rating.defaultProps = {
  onChange: null,
};
