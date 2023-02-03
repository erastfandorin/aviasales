import Route from "./Route/Route";
import style from "./Ticket.module.css";

function Ticket({ ticket }) {
  function convertCurrency(rub) {
    return rub / 200;
  }
  const dollars = convertCurrency(ticket.price).toFixed(0);
  const srcPatch = `https://pics.avs.io/99/36/${ticket.carrier}.png`;
  return (
    <li className={style.ticket}>
      <div className={style.headBox}>
        <div className={style.headBoxPrice}>{dollars} $</div>
        <img src={srcPatch} alt="air company" />
      </div>
      <div className={style.flightRoutBox}>
        {ticket.segments.map((segment, index) => (
          <Route key={index} segment={segment} />
        ))}
      </div>
    </li>
  );
}

export default Ticket;
