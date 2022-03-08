import { useState, useEffect } from "react";

import TransferFilter from "./components/Main/TransferFilter/TransferFilter.js";
import PreferenceTabs from "./components/Main/PreferenceTabs/PreferenceTabs.js";
import TicketList from "./components/Main/TicketList/TicketList.js";

import ticketsService from "./services/ticketsService.js";

import Logo from "../img/Logo.png";
import styles from "./App.module.css";

const log = console.log;

function App() {
  const [preference, setPreference] = useState("optimal"); // Cheapest, Fastest, Optimal
  const transferCountDefault = -1;
  const [transferCount, setTransferCount] = useState(transferCountDefault); // 100, 0, 1, 2, 3,

  useEffect( async () => {
    const resalt = await ticketsService.getAllTickets();
    log("result", resalt);
  }, []);
  

  return (
    <>
      <header className={styles.header}>
        <img src={Logo} alt="logo" />
      </header>
      <main className={styles.main}>
        <TransferFilter 
          setTransferCount={setTransferCount} 
          transferCountDefault={transferCountDefault}
        />
        <div className={styles.mainRight}>
          <PreferenceTabs 
            preference={preference} 
            setPreference={setPreference}
          />
          <TicketList />
        </div>
        {/* {preference} */}
      </main>
    </>
  );
}

export default App;
