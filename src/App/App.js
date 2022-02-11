import TransferFilter from "./components/Main/TransferFilter/TransferFilter.js";
import PreferenceTabs from "./components/Main/PreferenceTabs/PreferenceTabs.js";
import TicketList from "./components/Main/TicketList/TicketList.js";

import Logo from "../img/Logo.png";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <header className={styles.header}>
        <img src={Logo} alt="logo" />
      </header>
      <main className={styles.main}>
        <TransferFilter />
        <div className={styles.mainRight}>
          <PreferenceTabs />
          <TicketList />
        </div>
      </main>
    </>
  );
}

export default App;
