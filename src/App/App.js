import { useState, useEffect } from "react";

import TransferFilter from "./components/Main/TransferFilter/TransferFilter.js";
import PreferenceTabs from "./components/Main/PreferenceTabs/PreferenceTabs.js";
import TicketList from "./components/Main/TicketList/TicketList.js";

import ticketsService from "./services/ticketsService.js";

import Logo from "../img/Logo.png";
import styles from "./App.module.css";

const log = console.log;

function App() {
  const [preference, setPreference] = useState("fastest"); // Cheapest, Fastest, Optimal
  const transferCountDefault = -1;
  const [transferCount, setTransferCount] = useState(transferCountDefault); // -1, 0, 1, 2, 3, 100
  const [isLoading, setIsLoading] = useState(true)
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect( async () => {
    const result = await ticketsService.getAllTickets();
    setTickets(result);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    renderTickets();
  }, [tickets, preference, transferCount])
  function renderTickets() {
    log("tickets", tickets);

    const filteredTransferTickets = tickets.filter( ticket => {
      return (ticket.segments[0].stops.length <= transferCount
      && ticket.segments[1].stops.length <= transferCount) 
      || transferCount === transferCountDefault;
    })

    let sortedTickets;
    switch (preference) {
      case 'cheapest':
        sortedTickets = filteredTransferTickets.sort(comparePrice);
        function comparePrice( a, b ) {
          if ( a.price < b.price ){
            return -1;
          }
          if ( a.price > b.price ){
            return 1;
          }
          return 0;
        }
        break;
      case 'fastest':
        sortedTickets = filteredTransferTickets.sort(compareDuration);
        function compareDuration( a, b ) {
          const sumTicketDurationA = a.segments.reduce( (previousValue, currentValue) => 
            previousValue + currentValue.duration, 0);
          const sumTicketDurationB = b.segments.reduce( (previousValue, currentValue) =>
            previousValue + currentValue.duration, 0);
         if ( sumTicketDurationA < sumTicketDurationB ){
           return -1;
         }
         if ( sumTicketDurationA > sumTicketDurationB ){
           return 1;
         }
         return 0;
        }        
        break;
      case 'optimal':
        
        break;
      default:
        break;
    }
    const fiveTickets = sortedTickets.slice(0, 5);
    setFilteredTickets(fiveTickets);
  }
  

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
        </div>
      </main>
    </>
  );
}

export default App;
