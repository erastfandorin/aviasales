import styles from "./Tab.module.css"

function Tab({tab, preference, handleChange}) {
    const tabClasses = [styles.tab]
    const isChecked = preference === tab.id
    if(isChecked) {
        tabClasses.push(styles.tabIsActive)
    }

    return(
    <li className={tabClasses.join(' ')}>
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
    </li>)
}

export default Tab;