import { TicketGrid } from "../../components/TicketGrid/TicketGrid";
import { Title } from "../../components/Title/Title";
import { useFetch } from "../../hooks/useFetch";

export const Ticketpage = () => {
  const tickets = useFetch("https://api.mediehuset.net/mediesuset/tickets");

  return (
    <>
      <Title title={"Billetter"} />
      {tickets?.items && (
        <>
          <TicketGrid
            title={"PARTOUT BILLET - ALLE DAGE"}
            ticketArray={tickets.items}
            ticketType={"partout"}
          />
          <TicketGrid
            title={"ENKELTBILLETTER"}
            ticketArray={tickets.items}
            ticketType={"single"}
          />
        </>
      )}
    </>
  );
};
