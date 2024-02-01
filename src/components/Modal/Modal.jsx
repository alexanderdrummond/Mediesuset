import style from "./Modal.module.scss";

export const Modal = ({ handleModal, isModalOpen, children, topPos }) => {
  return (
    <>
      {isModalOpen && (
        <>
          <div className={style.modalBg}>
            <section
              style={topPos && { marginTop: topPos }}
              className={style.modalStyle}
            >
              <button onClick={handleModal}>X</button>
              {children}
            </section>
          </div>
        </>
      )}
    </>
  );
};
