import React from "react";
import style from "./CampModal.module.scss";

const CampModal = ({ camp, onClose }) => {
  const partoutTickets = camp.tickets.filter(
    (ticket) => ticket.type === "partout"
  );
  const singleTickets = camp.tickets.filter(
    (ticket) => ticket.type === "single"
  );

  const renderTicketCards = (tickets) =>
    tickets.map((ticket) => (
      <div key={ticket.id} className={style.ticketCard}>
        <h3>{ticket.name}</h3>
        <p>{ticket.description}</p>
        <p>Pris: {ticket.price} DKK</p>
      </div>
    ));

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContent}>
        <button className={style.closeButton} onClick={onClose}>
          X
        </button>
        <img src={camp.image} alt={camp.name} />
        <h2>{camp.name}</h2>
        <p>Kapacitet: {camp.num_people}</p>
        <p> {camp.description}</p>

        <h3>Adgangsgivende Billetter</h3>

        {partoutTickets.length > 0 && (
          <>
            <h4>Partout</h4>
            <div className={style.ticketGrid}>
              {renderTicketCards(partoutTickets)}
            </div>
          </>
        )}

        {singleTickets.length > 0 && (
          <>
            <h4>Enkelt</h4>
            <div className={style.ticketGrid}>
              {renderTicketCards(singleTickets)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CampModal;
