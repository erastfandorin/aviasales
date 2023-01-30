import React from "react";
import styles from "./Checkbox.module.css";

function Checkbox({ id, name, isChecked, handleCheckbox }) {
  return (
    <li className={`${styles.checkbox} ${isChecked ? styles.checkboxIsChecked : ""}`}>
      <label className={styles.checkboxLabel}>
        <span className={styles.checkboxInputWrapper}>
          <span className={styles.checkboxTick}></span>
          <input className={styles.checkboxInput} id={`checkbox_${id}`} type="checkbox" checked={isChecked} onChange={handleCheckbox} />
        </span>
        <span className={styles.checkboxName}>{name}</span>
      </label>
    </li>
  );
}

export default Checkbox;
