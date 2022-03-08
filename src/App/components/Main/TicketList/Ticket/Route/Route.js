import style from "./Route.module.css";

function Route(props) {
    return (
        <ul>
        <li className={style.route}>
            <div className={style.headline}>MOW – HKT</div>
            <div className={style.info}>10:45 – 08:00</div>
        </li>
        <li className={style.allTime}>
            <div className={style.headline}>В пути</div>
            <div className={style.info}>21ч 15м</div>
        </li>
        <li className={style.transfers}>
            <div className={style.headline}>2 пересадки</div>
            <div className={style.info}>HKG, JNB</div>
        </li>
    </ul>
    );
}

export default Route;