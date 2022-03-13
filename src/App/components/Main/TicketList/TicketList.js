import Ticket from "./Ticket/Ticket";
import styles from "./TicketList.module.css";

function TicketList({tickets}) {
    return (
        <ul className={styles.ticketList}>
            {tickets.map( (ticket, index) => 
                <Ticket key={index} ticket={ticket} />
            )}
        </ul>
    );
}

export default TicketList;