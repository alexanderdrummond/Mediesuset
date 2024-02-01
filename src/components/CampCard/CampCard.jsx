import style from "./CampCard.module.scss";

export const CampCard = ({ children, title, imgSrc, handleModal }) => {
  return (
    <div className={style.campCardStyle}>
      <img src={imgSrc}></img>
      <section>
        <h3>{title}</h3>
        {children}
        <button onClick={() => handleModal()}>Læs mere</button>
      </section>
    </div>
  );
};
