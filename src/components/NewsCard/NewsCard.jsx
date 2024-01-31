import style from "./NewsCard.module.scss";

export const NewsCard = ({ imgSrc, title, text, handleModal }) => {
  return (
    <div className={style.newsCardStyle}>
      <img src={imgSrc}></img>
      <section>
        <h3>{title}</h3>
        {text && <p>{text}</p>}
        <button onClick={() => handleModal()}>Læs mere</button>
      </section>
    </div>
  );
};
