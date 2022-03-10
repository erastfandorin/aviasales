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
  const [transferCount, setTransferCount] = useState(transferCountDefault); // -1, 0, 1, 2, 3, 100
  const [isLoading, setIsLoading] = useState(true)
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect( async () => {
    const result = await ticketsService.getAllTickets();
    log("getAllTickets", result);
    setTickets(result);
    setIsLoading(false);

  }, []);
  useEffect(() => {
    const filteredTransferTickets = tickets.filter( ticket => {
      return (ticket.segments[0].stops.length <= transferCount
      && ticket.segments[1].stops.length <= transferCount) 
      || transferCount === transferCountDefault;
    })

    switch (preference) {
      case 'cheapest':
        const cheapestTicket = filteredTransferTickets.sort(comparePrice);
        function comparePrice( a, b ) {
          if ( a.price < b.price ){
            return -1;
          }
          if ( a.price > b.price ){
            return 1;
          }
          return 0;
        }
        // log(cheapestTicket);
        const fiveTickets = cheapestTicket.slice(0,5);
        log(fiveTickets);
        setFilteredTickets(fiveTickets);
        break;
      case 'fastest':
        
        break;
      case 'optimal':
        
        break;
      default:
        break;
    }
    // filteredTransferTickets.
    // log("filtered",filteredTransferTickets);
    // log(tickets, preference, transferCount);
  }, [preference, transferCount])
  

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
          {isLoading
            ? <div className={styles.loadingSpinner}>
                <div className={styles.load}>
                  <div></div>
                </div>
              </div> 
            : <TicketList tickets={filteredTickets} /> }
        {/* {preference} */}
        </div>
      </main>
    </>
  );
}

export default App;
