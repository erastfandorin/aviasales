import { useState, useEffect } from "react";

import TransferFilter from "./components/Main/TransferFilter/TransferFilter.js";
import PreferenceTabs from "./components/Main/PreferenceTabs/PreferenceTabs.js";
import TicketList from "./components/Main/TicketList/TicketList.js";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

import ticketsService from "./services/ticketsService.js";

import Logo from "../img/Logo.png";
import styles from "./App.module.css";

function App() {
  const [preference, setPreference] = useState("optimal"); // Cheapest, Fastest, Optimal
  const transferCountDefault = -1;
  const [transferCount, setTransferCount] = useState(transferCountDefault); // -1, 0, 1, 2, 3, 100
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await ticketsService.getAllTickets();
      console.log(result);
      setTickets(result);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const filteredTransferTickets = tickets.filter((ticket) => {
      return (
        (ticket.segments[0].stops.length <= transferCount &&
          ticket.segments[1].stops.length <= transferCount) ||
        transferCount === transferCountDefault
      );
    });

    let sortedTickets;
    switch (preference) {
      case "cheapest":
        sortedTickets = filteredTransferTickets.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      case "fastest":
        sortedTickets = filteredTransferTickets.sort(function (a, b) {
          const sumTicketDurationA = a.segments.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.duration,
            0
          );
          const sumTicketDurationB = b.segments.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.duration,
            0
          );

          return sumTicketDurationA - sumTicketDurationB;
        });
        break;
      case "optimal":
        const prices = filteredTransferTickets.map((ticket) => ticket.price);
        const maxPrice = Math.max(...prices, 0);
        const minPrice = Math.min(...prices, 0);

        const durations = filteredTransferTickets.map((ticket) => {
          return ticket.segments.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.duration,
            0
          );
        });
        const maxDuration = Math.max(...durations, 0);
        const minDuration = Math.min(...durations, 0);

        sortedTickets = filteredTransferTickets.sort(function (a, b) {
          const normalizedPriceA = normalizeCount(a.price, maxPrice, minPrice);
          const normalizedPriceB = normalizeCount(b.price, maxPrice, minPrice);

          const durationA = a.segments.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.duration,
            0
          );
          const durationB = b.segments.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.duration,
            0
          );
          const normalizedDurationA = normalizeCount(
            durationA,
            maxDuration,
            minDuration
          );
          const normalizedDurationB = normalizeCount(
            durationB,
            maxDuration,
            minDuration
          );

          const normalizedCountA = normalizedPriceA + normalizedDurationA;
          const normalizedCountB = normalizedPriceB + normalizedDurationB;

          function normalizeCount(val, max, min) {
            return (val - min) / (max - min);
          }

          return normalizedCountA - normalizedCountB;
        });
        break;
      default:
        break;
    }
    const sortedFiveTickets = sortedTickets.slice(0, 5);
    setFilteredTickets(sortedFiveTickets);
  }, [tickets, preference, transferCount, transferCountDefault]);

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
          {isLoading ? (
            <div className={styles.loadingSpinner}>
              <div className={styles.load}>
                <div></div>
              </div>
            </div>
          ) : (
            <TicketList tickets={filteredTickets} />
          )}
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
