import style from "./Route.module.css";

function Route({info}) {
    function convertMinutesToHoursMin(min) {
        const hours = Math.floor(totalMinutes / 60);          
        const minutes = totalMinutes % 60;

        hours = hours < 10 ? '0' + hours : hours; 
        minutes = minutes < 10 ? '0' + minutes : minutes; 
        return `${hours}ч ${minutes}м`;
        // return `${hours} `
    }
    function calculateTransfersHeadline(transfers) {
        let headline = '';
        switch (transfers) {
            case 0:
                headline = "Без пересадок"
                break;
            case 0:
                headline = "Без пересадок"
                break;
            case 0:
                headline = "Без пересадок"
                break;
            default:
                break;
        }
    }
    return (
        <ul>
        <li className={style.route}>
            <div className={style.headline}>{info.origin} – {info.destination}</div>
            <div className={style.info}>10:45 – 08:00</div>
        </li>
        <li className={style.allTime}>
            <div className={style.headline}>В пути</div>
            <div className={style.info}>{convertMinutesToHoursMin(info.duration)}</div>
        </li>
        <li className={style.transfers}>
            <div className={style.headline}>2 пересадки</div>
            <div className={style.info}>HKG, JNB</div>
        </li>
    </ul>
    );
}

export default Route;