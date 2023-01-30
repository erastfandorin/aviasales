import { useState, useEffect } from "react";
import TransferFilter from "./components/Main/TransferFilter/TransferFilter.js";
import PreferenceTabs from "./components/Main/PreferenceTabs/PreferenceTabs.js";
import TicketList from "./components/Main/TicketList/TicketList.js";
import LoadingSpinner from "./components/Main/LoadingSpinner/LoadingSpinner.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ticketsService from "./services/ticketsService.js";
import Logo from "../img/Logo.png";
import styles from "./App.module.css";

const transferCountDefault = -1;

function App() {
  const [preference, setPreference] = useState("optimal"); // Cheapest, Fastest, Optimal
  const [transferCount, setTransferCount] = useState(transferCountDefault); // -1, 0, 1, 2, 3, 100
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await ticketsService.getAllTickets();
      setTickets(result);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const filteredTickets = tickets.filter((ticket) => {
      const transfer = ticket.segments.every((segment) => segment.stops.length <= transferCount);
      return transfer || transferCount === transferCountDefault;
    });

    const sortedTickets = sortByPreference(filteredTickets, preference);
    const sortedFiveTickets = sortedTickets.slice(0, 5);
    setFilteredTickets(sortedFiveTickets);

    function sortByPreference(tickets, preference) {
      switch (preference) {
        case "cheapest":
          return tickets.sort((a, b) => a.price - b.price);
        case "fastest":
          return tickets.sort((a, b) => getSumTicketDuration(a) - getSumTicketDuration(b));
        case "optimal":
          const prices = tickets.map((ticket) => ticket.price);
          const maxPrice = Math.max(...prices, 0);
          const minPrice = Math.min(...prices, 0);

          const durations = tickets.map(getSumTicketDuration);
          const maxDuration = Math.max(...durations, 0);
          const minDuration = Math.min(...durations, 0);

          return tickets.sort(function (a, b) {
            const normalizedPriceA = normalizeCount(a.price, maxPrice, minPrice);
            const normalizedPriceB = normalizeCount(b.price, maxPrice, minPrice);

            const normalizedDurationA = normalizeCount(getSumTicketDuration(a), maxDuration, minDuration);
            const normalizedDurationB = normalizeCount(getSumTicketDuration(b), maxDuration, minDuration);

            return normalizedPriceA + normalizedDurationA - (normalizedPriceB + normalizedDurationB);
          });
        default:
          return tickets;
      }
    }
    function getSumTicketDuration(ticket) {
      return ticket.segments.reduce((prev, curr) => prev + curr.duration, 0);
    }
    function normalizeCount(val, max, min) {
      return (val - min) / (max - min);
    }
  }, [tickets, preference, transferCount]);

  return (
    <>
      <header className={styles.header}>
        <img src={Logo} alt="logo" />
      </header>
      <main className={styles.main}>
        <TransferFilter setTransferCount={setTransferCount} transferCountDefault={transferCountDefault} />
        <div className={styles.mainRight}>
          <PreferenceTabs preference={preference} setPreference={setPreference} />
          {isLoading ? <LoadingSpinner /> : <TicketList tickets={filteredTickets} />}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </main>
    </>
  );
}
export default App;
