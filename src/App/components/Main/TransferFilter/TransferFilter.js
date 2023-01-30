import React, { useState } from "react";
import Checkbox from "./Checkbox/Checkbox";
import styles from "./TransferFilter.module.css";

const transferCheckboxes = [
  { name: "Без пересадок", transferCount: 0, isChecked: false },
  { name: "1 пересадка", transferCount: 1, isChecked: false },
  { name: "2 пересадки", transferCount: 2, isChecked: false },
  { name: "3 пересадки", transferCount: 3, isChecked: false },
  { name: "Все", transferCount: 100, isChecked: false },
];

function TransferFilter({ setTransferCount, transferCountDefault }) {
  const [filterCheckboxes, setFilterCheckboxes] = useState(transferCheckboxes);

  function handleCheckbox(e, index) {
    const newArr = [...filterCheckboxes];
    newArr[index].isChecked = e.target.checked;
    setFilterCheckboxes(newArr);

    let newCount = transferCountDefault;
    newArr.forEach((checkbox) => {
      if (checkbox.isChecked && newCount < checkbox.transferCount) {
        newCount = checkbox.transferCount;
      }
    });
    setTransferCount(newCount);
  }

  return (
    <div className={styles.filterBox}>
      <p className={styles.filterBox__name}>Количество пересадок</p>
      <ul className={styles.filterBox__list}>
        {filterCheckboxes.map((checkbox, index) => {
          return (
            <Checkbox
              key={checkbox.transferCount}
              id={checkbox.transferCount}
              name={checkbox.name}
              isChecked={checkbox.isChecked}
              handleCheckbox={(checked)=>handleCheckbox(checked, index)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default TransferFilter;
