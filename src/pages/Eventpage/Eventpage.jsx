import { useState } from "react";
import { EventBar } from "../../components/EventBar/EventBar";
import { EventCard } from "../../components/EventCard/EventCard";
import { Title } from "../../components/Title/Title";
import { getDayFromDate } from "../../helpers/getDayFromDate";
import { getEventColor } from "../../helpers/getEventColor";
import { useFetch } from "../../hooks/useFetch";
import style from "../Eventpage/Eventpage.module.scss";
import { Modal } from "../../components/Modal/Modal";

export const Eventpage = () => {
  const [eventID, setEventID] = useState(2);
  const [selectedEvent, setSelectedEvent] = useState("0");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const events = useFetch("https://api.mediehuset.net/mediesuset/events");
  const eventDetails = useFetch(
    `https://api.mediehuset.net/mediesuset/events/${eventID}`
  );
  const daysInWeek = [
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
    "Søndag",
  ];

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEventID = (id) => {
    handleModal();
    setEventID(id);
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
                  setEventID={() => handleEventID(item.id)}
                  date={`${
                    daysInWeek[getDayFromDate(item.local_time)]
                  } kl. ${item.local_time.substring(11, 16)}`}
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

      <Modal isModalOpen={isModalOpen} handleModal={handleModal}>
        <article className={style.eventModalWrapper}>
          <h3
            style={{
              backgroundColor: getEventColor(eventDetails?.item?.stage_id),
            }}
          >
            {eventDetails?.item?.stage_name}{" "}
            {daysInWeek[getDayFromDate(eventDetails?.item?.local_time)]} kl.{" "}
            {eventDetails?.item?.local_time.substring(11, 16)}
          </h3>
          <div>
            <img
              src={eventDetails?.item?.image}
              alt={eventDetails?.item?.title}
            />
            <p>{eventDetails?.item?.description}</p>
          </div>
        </article>
      </Modal>
    </>
  );
};
