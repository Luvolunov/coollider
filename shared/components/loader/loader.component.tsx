import styles from './loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader} />
    </div>
  );
}
