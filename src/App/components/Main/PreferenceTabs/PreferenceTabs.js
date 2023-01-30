import Tab from "./Tab/Tab";
import styles from "./PreferenceTabs.module.css";

const preferenceList = [
  { name: "Самый дешевый", id: "cheapest" },
  { name: "Самый быстрый", id: "fastest" },
  { name: "Оптимальный", id: "optimal" },
];

function PreferenceTabs({ preference, setPreference }) {
  function handleChange(e) {
    setPreference(e.target.id);
  }
  return (
    <ul className={styles.preferenceTabs}>
      {preferenceList.map((preferenceTab) => (
        <Tab key={preferenceTab.id} tab={preferenceTab} preference={preference} handleChange={handleChange} />
      ))}
    </ul>
  );
}
export default PreferenceTabs;
