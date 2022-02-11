import React from 'react';
import styles from "./Checkbox.module.css"

function Checkbox({id, name, isChecked, changeCheckbox}) {
    const checkboxId = `checkbox_${id}`;
    
    const checkboxClasses = [styles.checkbox];
    if (isChecked) {
    checkboxClasses.push(styles.checkboxIsChecked);
    }

    return (
        <li className={checkboxClasses.join(' ')}>
            <label className={styles.checkboxLabel}>
                <span className={styles.checkboxInputWrapper}>
                    <span className={styles.checkboxTick}></span>
                    <input className={styles.checkboxInput} 
                           id={checkboxId} 
                           type="checkbox" 
                           checked={isChecked} 
                           onChange={changeCheckbox}/>
                </span>
                <span className={styles.checkboxName}>{name}</span>
            </label>
        </li>
    );
}

export default Checkbox;