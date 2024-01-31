import style from "../EventCard/EventCard.module.scss";

export const EventCard = ({ image, title, date, stageColor, setEventID }) => {
  return (
    <figure onClick={setEventID} className={style.eventCardStyle}>
      <div>
        <img src={image} />
      </div>
      <figcaption style={{ backgroundColor: stageColor }}>
        <p>{title}</p>
        <p>{date}</p>
        <p>Læs mere</p>
      </figcaption>
    </figure>
  );
};
