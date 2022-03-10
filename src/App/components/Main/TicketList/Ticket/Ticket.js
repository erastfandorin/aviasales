import Route from "./Route/Route";
import style from "./Ticket.module.css"

function Ticket({ticket}) {
    function convertCurrency(rub) {
        return rub / 200;
    }
    const dollars = convertCurrency(ticket.price).toFixed(1);
    const srcPatch = `https://pics.avs.io/99/36/${ticket.carrier}.png`
    return (
        <li className={style.ticket}>
            <div className={style.headBox}>
                <div className={style.headBoxPrice}>{dollars} $</div>
                <img src={srcPatch}/>
            </div>
            <div className={style.flightRoutBox}>
                {ticket.segments.map( (segment, index) => 
                    <Route key={index} info={segment}/>
                )}
                {/* <Route /> */}
            </div>
            {/* <div className={style.flightRoutBox}>
            </div> */}
        </li>
    );
}

export default Ticket;