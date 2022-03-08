import Route from "./Route/Route";
import style from "./Ticket.module.css"

function Ticket(props) {
    return (
        <li className={style.ticket}>
            <div className={style.headBox}>
                <div className={style.headBoxPrice}>13 400 Р</div>
                <img />
            </div>
            <div className={style.flightThereBox}>
                <Route />
            </div>
            <div className={style.flightBackBox}>
                <Route />
            </div>
        </li>
    );
}

export default Ticket;