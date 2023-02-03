import { useMemo } from "react";
import style from "./Route.module.css";

function choiceTransfersHeadline(transfers) {
  switch (transfers) {
    case 0:
      return "Без пересадок";
    case 1:
      return "1 пересадка";
    default:
      return `${transfers} пересадки`;
  }
}

function calculateArrivalTime(departureString, duration) {
  const date = new Date(Date.parse(departureString));

  const startHours = `${date.getHours()}`.padStart("2", 0);
  const startMinutes = `${date.getMinutes()}`.padStart("2", 0);
  date.setMinutes(date.getMinutes() + duration);
  const endHours = `${date.getHours()}`.padStart("2", 0);
  const endMinutes = `${date.getMinutes()}`.padStart("2", 0);

  return {
    startTime: `${startHours}:${startMinutes}`,
    endTime: `${endHours}:${endMinutes}`,
  };
}

function convertMinutesToHoursMinutes(min) {
  let hours = `${Math.floor(min / 60)}`.padStart("2", 0);
  let minutes = `${min % 60}`.padStart("2", 0);

  return `${hours}г ${minutes}хв`;
}

function Route({ segment }) {
  const { date, duration, origin, destination, stops } = segment;

  const formattedTime = useMemo(() => calculateArrivalTime(date, duration), [date, duration]);
  const hourMinutes = useMemo(() => convertMinutesToHoursMinutes(duration), [duration]);
  const transferHeadline = useMemo(() => choiceTransfersHeadline(stops.length), [stops.length]);

  return (
    <ul>
      <li className={style.route}>
        <div className={style.headline}>
          {origin} – {destination}
        </div>
        <div className={style.info}>
          {formattedTime.startTime} – {formattedTime.endTime}
        </div>
      </li>
      <li className={style.allTime}>
        <div className={style.headline}>В дорозі</div>
        <div className={style.info}>{hourMinutes}</div>
      </li>
      <li className={style.transfers}>
        <div className={style.headline}>{transferHeadline}</div>
        <div className={style.info}>{stops.toString()}</div>
      </li>
    </ul>
  );
}

export default Route;
