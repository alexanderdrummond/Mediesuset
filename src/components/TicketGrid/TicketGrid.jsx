import { NavLink } from "react-router-dom";
import style from "./TicketGrid.module.scss";

export const TicketGrid = ({ title, ticketArray, ticketType }) => {
  // Title = PARTOUT BILLET - ALLE DAGE

  return (
    <section className={style.ticketGrid}>
      <div className={style.darkHeading}>
        <p>{title}</p>
      </div>

      {ticketArray.map((ticket) => {
        if (ticket.type === ticketType)
          return (
            <div key={ticket.id} className={style.ticketItem}>
              <p>{ticket.name}</p>
              <p>{ticket.price} DKK</p>
              <NavLink to={`/billetter/checkout/${ticket.id}`}>
                KØB BILLET
              </NavLink>
            </div>
          );
      })}
    </section>
  );
};
