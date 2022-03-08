import React, { useState } from 'react';
import Checkbox from './Checkbox/Checkbox';
import styles from './TransferFilter.module.css';

function TransferFilter({ setTransferCount, transferCountDefault }) {
    const [filterCheckboxes, setFilterCheckboxes] = useState([
        { name: "Все", transferCount: 100, isChecked: false},
        { name: "Без пересадок", transferCount: 0, isChecked: false},
        { name: "1 пересадка", transferCount: 1, isChecked: false},
        { name: "2 пересадки", transferCount: 2, isChecked: false},
        { name: "3 пересадки", transferCount: 3, isChecked: false},
    ]);

    function changeCheckbox(e) {
        const index = getCheckboxIndex(e);
        const newArr = [...filterCheckboxes];
        newArr[index].isChecked = e.target.checked;
        setFilterCheckboxes(newArr);

        let nweCount = transferCountDefault;
        newArr.forEach( checkbox => {
            if(checkbox.isChecked && nweCount < checkbox.transferCount) {
                nweCount = checkbox.transferCount
            }
        })
        setTransferCount(nweCount);
    }
    function getCheckboxIndex(e) {
        const id = e.target.id
        const currentTransferCount = id.match(/(?<=checkbox_)[0-9a-z]+/)[0];
        return filterCheckboxes.map(checkbox => checkbox.transferCount)
                               .indexOf( Number(currentTransferCount) );
    }
    
    return (
        <div className={styles.filterBox}>
            <p className={styles.filterBox__name}>Количество пересадок</p>
            <ul className={styles.filterBox__list}>
                {filterCheckboxes.map(checkbox => {
                    return <Checkbox 
                    key={checkbox.transferCount}
                    id={checkbox.transferCount}
                    name={checkbox.name}
                    isChecked={checkbox.isChecked} 
                    changeCheckbox= {changeCheckbox} />
                })}
            </ul>
        </div>
    );
}

export default TransferFilter;