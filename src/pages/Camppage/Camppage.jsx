import { useState } from "react";
import { CampCard } from "../../components/CampCard/CampCard";
import { NewsCard } from "../../components/NewsCard/NewsCard";
import { Title } from "../../components/Title/Title";
import { useFetch } from "../../hooks/useFetch";
import style from "./Camppage.module.scss";
import { Modal } from "../../components/Modal/Modal";

export const Camppage = () => {
  const [isModalOpen, setIsModalOpen] = useState();
  const [selectedCamp, setSelectedCamp] = useState(1);
  const camps = useFetch("https://api.mediehuset.net/mediesuset/camps");
  const singleCamp = useFetch(
    `https://api.mediehuset.net/mediesuset/camps/${selectedCamp}`
  );
  const handleModal = (id) => {
    if (typeof id === "string" || typeof id === "number") {
      setSelectedCamp(id);
    }
    setIsModalOpen(!isModalOpen);
  };

  console.log(singleCamp);
  return (
    <>
      <Title title={"Camps"} />
      <section className={style.campWrapper}>
        {camps?.items.map((item) => {
          return (
            <CampCard
              key={item.id}
              handleModal={() => handleModal(item.id)}
              title={item.name}
              imgSrc={item.image}
            >
              <>
                <p>
                  {item.name} er en camp med plads til {item.num_people}.
                  Følgende armbånd giver adgang til denne camp:
                </p>
                <ul>
                  {item.tickets.map((item) => {
                    return (
                      <li key={item.id}>
                        {item.name + " - " + item.price + " DKK"}
                      </li>
                    );
                  })}
                </ul>
              </>
            </CampCard>
          );
        })}
      </section>
      <Modal topPos={"5vh"} handleModal={handleModal} isModalOpen={isModalOpen}>
        <section className={style.modalWrapper}>
          <h2>{singleCamp?.item?.name}</h2>
          <div>
            <img src={singleCamp?.item?.image}></img>

            <div>
              {singleCamp?.item?.tickets.map((ticket) => {
                return (
                  <p>
                    {ticket.name} - Kun: {ticket.price || "???"} DKK
                  </p>
                );
              })}
            </div>
          </div>
          <p>{singleCamp?.item?.description}</p>
          <h3>Faciliteter: </h3>
          <ul>
            {singleCamp?.item?.facilities?.map((facility) => {
              return <li>{facility.title}</li>;
            })}
          </ul>
        </section>
      </Modal>
    </>
  );
};
