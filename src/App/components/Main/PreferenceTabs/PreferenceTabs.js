import { useState } from "react";
import Tab from "./Tab/Tab";
import styles from "./PreferenceTabs.module.css";

const preferenceList = [
    {name:"Самый дешевый",id:"cheapest"},
    {name:"Самый быстрый",id:"fastest"},
    {name:"Оптимальный",id:"optimal"}
];

function PreferenceTabs() {
    const [preferenceTabs, setPreferenceTabs] = useState("optimal"); // Cheapest Fastest Optimal

    function handleChange(e) {
        console.log(e)
        setPreferenceTabs(e.target.id);
    }
    return (
        <ul className={styles.preferenceTabs}>
            { preferenceList.map( preference => 
                <Tab key={preference.id} 
                     tab={preference} 
                     preferenceTabs={preferenceTabs}
                     handleChange={handleChange}
                     />
            )}
        </ul>
    )
}
export default PreferenceTabs;