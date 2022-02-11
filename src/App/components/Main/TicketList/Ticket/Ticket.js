import style from "./Ticket.module.css"

function Ticket(props) {
    return (
        <li className={style.ticket}>
            <div className={style.ticket__headBox}>
                <div className={style.ticket__headBoxPrice}>13 400 Р</div>
                <img />
            </div>
            <div className={style.ticket__flightThereBox}>
                <ul>
                    <li className={style.flightThereBox__route}>
                        <div>MOW – HKT</div>
                        <div>10:45 – 08:00</div>
                    </li>
                    <li>
                        <div>В пути</div>
                        <div>21ч 15м</div>
                    </li>
                    <li>
                        <div>2 пересадки</div>
                        <div>HKG, JNB</div>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <div>MOW – HKT</div>
                        <div>10:45 – 08:00</div>
                    </li>
                    <li>
                        <div>В пути</div>
                        <div>21ч 15м</div>
                    </li>
                    <li>
                        <div>2 пересадки</div>
                        <div>HKG, JNB</div>
                    </li>
                </ul>
            </div>
        </li>
    );
}

export default Ticket;