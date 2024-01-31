import CampCard from "../../components/CampCard/CampCard";
import CampModal from "../../components/CampModal/CampModal";
import { Title } from "../../components/Title/Title";
import { useFetch } from "../../hooks/useFetch";
import style from "./Camppage.module.scss";
import { useState } from "react";

export const Camppage = () => {
  const camps = useFetch("https://api.mediehuset.net/mediesuset/camps");
  const [selectedCamp, setSelectedCamp] = useState(null);

  const handleReadMore = (camp) => {
    setSelectedCamp(camp);
  };

  const handleCloseModal = () => {
    setSelectedCamp(null);
  };


  console.log(camps);

  return (
    <>
      <Title title={"Camps"} />
      <section className={style.campWrapper}>
        {camps?.items.map((item) => {
          const textContent = (
            <>
              <p>
                {item.name} er en camp med plads til {item.num_people}.
              </p>
              <h3>Følgende
                armbånd giver adgang til denne camp:</h3>
              <div>
                {item.tickets.map((ticket) => (
                  <div key={ticket.id} className={style.ticketCard}>
                    <span className={style.ticketName}>{ticket.name}</span>
                    <span className={style.ticketPrice}>{ticket.price} DKK</span>
                  </div>
                ))}
              </div>
            </>
          );

          return (
            <CampCard
              key={item.id}
              title={item.name}
              imgSrc={item.image}
              text={textContent}
              onReadMore={() => handleReadMore(item)}
            />
          );
        })}
      </section>
      {selectedCamp && <CampModal camp={selectedCamp} onClose={handleCloseModal} />}
    </>
  );
};
