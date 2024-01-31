import { useState } from "react";
import { EventBar } from "../../components/EventBar/EventBar";
import { EventCard } from "../../components/EventCard/EventCard";
import { Title } from "../../components/Title/Title";
import { Modal } from "../../components/Modal/Modal";
import { getDayFromDate } from "../../helpers/getDayFromDate";
import { getEventColor } from "../../helpers/getEventColor";
import { useFetch } from "../../hooks/useFetch";
import style from "../Eventpage/Eventpage.module.scss";

export const Eventpage = () => {
  const events = useFetch("https://api.mediehuset.net/mediesuset/events");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedEventID, setSelectedEventID] = useState(null); 
  const eventDetails = useFetch(`https://api.mediehuset.net/mediesuset/events/${selectedEventID}`);

  const daysInWeek = [
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
    "Søndag",
  ];

  const [selectedEvent, setSelectedEvent] = useState("0");

  const handleModal = (id) => {
    setSelectedEventID(id);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Title title={"Events"} />
      <EventBar setSelectedEvent={setSelectedEvent} />
      <section className={style.eventPageWrapper}>
        {events ? (
          events.items.map((item) => {
            if (item.stage_id === selectedEvent || selectedEvent === "0") {
              return (
                <div className="event-card" onClick={() => handleModal(item.id)}>
                <EventCard
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  date={`${daysInWeek[getDayFromDate(item.local_time)]} kl. ${item.local_time.substring(11, 16)}`}
                  stageColor={getEventColor(item.stage_id)}
                 
                />
                </div>
              );
            }
            return null; 
          })
        ) : (
          <h3>Could not load events - try again</h3>
        )}
      </section>
      {isModalOpen && (
        <Modal handleModal={() => handleModal(null)} isModalOpen={isModalOpen}>
        
          <figure className={style.eventDetailsWrapper}>
            <img src={eventDetails?.item.image} alt={eventDetails?.item.title} />
            <figcaption>
              <h4>{eventDetails?.item.title}</h4>
              <p>{eventDetails?.item.description}</p>
              <p>{`${eventDetails?.item.stage_name}`}</p>
              <p>{`${new Date(eventDetails?.item.datetime * 1000).toString()}`}</p>
            </figcaption>
          </figure>
        </Modal>
      )}
    </>
  );
};
