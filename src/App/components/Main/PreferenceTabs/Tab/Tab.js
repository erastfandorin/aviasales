import styles from "./Tab.module.css";

function Tab({ tab, preference, handleChange }) {
  const isChecked = preference === tab.id;

  return (
    <li className={`${styles.tab} ${isChecked ? styles.tabIsActive : ""}`}>
      <label className={styles.tabLabel}>
        {tab.name}
        <input
          className={styles.tabRadioInput}
          type="radio"
          name="preference"
          id={tab.id}
          checked={isChecked}
          value={tab.id}
          onChange={handleChange}
        />
      </label>
    </li>
  );
}

export default Tab;