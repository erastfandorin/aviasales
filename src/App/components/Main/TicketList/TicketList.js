import Ticket from "./Ticket/Ticket";
import styles from "./TicketList.module.css";

function TicketList(props) {
    return (
        <ul className={styles.ticketList}>
            <Ticket />
        </ul>
    );
}

export default TicketList;