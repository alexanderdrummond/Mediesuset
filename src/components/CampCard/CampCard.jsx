import React from 'react';
import style from './CampCard.module.scss'; 

const CampCard = ({ title, imgSrc, text, onReadMore }) => {
  return (
    <div className={style.campCard}>
      <img src={imgSrc} alt={title} />
      <div className={style.cardContent}>
        <h2>{title}</h2>
        {text}
        <button className={style.readMoreButton} onClick={onReadMore}>læs mere</button>
      </div>
    </div>
  );
};

export default CampCard;
