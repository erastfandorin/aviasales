import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.load}>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
