import style from "./Route.module.css";

function Route({ info }) {
  const formattedTime = calculateArrivalTime(info.date, info.duration);
  function calculateArrivalTime(departureString, duration) {
    let date = new Date(Date.parse(departureString));
    const startHours = date.getHours();
    const startMinutes = date.getMinutes();
    date.setMinutes(date.getMinutes() + duration);
    const endHours = date.getHours();
    const endMinutes = date.getMinutes();
    return {
      startTime: `${startHours}:${startMinutes}`,
      endTime: `${endHours}:${endMinutes}`,
    };
  }
  function convertMinutesToHoursMin(min) {
    let hours = Math.floor(min / 60);
    let minutes = min % 60;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}ч ${minutes}м`;
  }
  function choiceTransfersHeadline(transfers) {
    let headline = "";
    switch (transfers) {
      case 0:
        headline = "Без пересадок";
        break;
      case 1:
        headline = "1 пересадка";
        break;
      default:
        headline = `${transfers} пересадки`;
        break;
    }
    return headline;
  }
  return (
    <ul>
      <li className={style.route}>
        <div className={style.headline}>
          {info.origin} – {info.destination}
        </div>
        <div className={style.info}>
          {formattedTime.startTime} – {formattedTime.endTime}
        </div>
      </li>
      <li className={style.allTime}>
        <div className={style.headline}>В дорозі</div>
        <div className={style.info}>{convertMinutesToHoursMin(info.duration)}</div>
      </li>
      <li className={style.transfers}>
        <div className={style.headline}>{choiceTransfersHeadline(info.stops.length)}</div>
        <div className={style.info}>{info.stops.toString()}</div>
      </li>
    </ul>
  );
}

export default Route;
