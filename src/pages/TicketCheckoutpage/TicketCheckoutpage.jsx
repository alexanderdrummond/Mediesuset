import { NavLink, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import style from "./TicketCheckoutpage.module.scss";
import { Title } from "../../components/Title/Title";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";

export const TicketCheckoutpage = () => {
  const { id } = useParams();
  const { userData } = useContext(UserContext);

  const ticketDetails = useFetch(
    `https://api.mediehuset.net/mediesuset/tickets/${id}`
  );

  const camps = useFetch(`https://api.mediehuset.net/mediesuset/camps`);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [totalPrice, setTotalPrice] = useState();
  const [amount, setAmount] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = (data) => submitForm(data);

  useEffect(() => {
    if (ticketDetails?.item) {
      setTotalPrice(ticketDetails.item.price);
    }
  }, [ticketDetails]);

  const handleTicketAmount = (e) => {
    setTotalPrice(() => e.target.value * ticketDetails?.item?.price + ".00");
    setAmount(e.target.value);
  };

  const handleComplete = () => {
    setMessage("Du har nu bestilt en billet");
    setIsComplete(true);
  };

  const submitForm = (data) => {
    let url = `https://api.mediehuset.net/mediesuset/usertickets`;
    let body = new URLSearchParams();

    body.append("email", data.email);
    body.append("password", data.password);
    body.append("name", data.name);
    body.append("zipcode", parseInt(data.postal_code));
    body.append("address", data.address);
    body.append("city", data.city);
    body.append("ticket_id", parseInt(ticketDetails?.item.id));
    body.append("camp_id", parseInt(data.camp));
    body.append("quantity", parseInt(amount));
    body.append("type", data.shipping);

    let options = {
      method: "POST",
      body: body,
      headers: {
        Authorization: "Bearer " + userData.access_token,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) =>
        data.status === "Ok"
          ? handleComplete()
          : setMessage("Noget gik galt - Prøv igen")
      )
      .catch((err) => console.log(err));
  };

  console.log("Amount", amount);

  return (
    <>
      <Title title={"BILLETTER"} />
      {userData && !isComplete ? (
        <section className={style.checkoutContainer}>
          <div className={style.darkHeading}>
            <p>INFORMATION OM DEN VALGTE BILLET</p>
          </div>
          <article>
            <h4>{ticketDetails?.item?.name}</h4>
            <p>{ticketDetails?.item?.description}</p>
            <p>
              Billetten ombyttes til et armbånd ved en af billetvognene ved
              festivalpladsens indgang
            </p>
            <p>
              Billetten giver fri adgang til festivalpladsen, alle scener,
              spisesteder og aktiviteter
            </p>
          </article>
          <div className={style.darkHeading}>
            <p>BESTILLING</p>
          </div>

          <div className={style.amountContainer}>
            <p>ANTAL: </p>
            <input
              onChange={(e) => handleTicketAmount(e)}
              type="number"
              defaultValue={1}
            ></input>
            <p>Stk. {ticketDetails?.item?.name}</p>
            <p>DKK {ticketDetails?.item?.price}</p>
            <p>DKK {totalPrice}</p>
          </div>
          <div className={style.totalContainer}>
            <b>Pris i alt:</b>
            <b>DKK {totalPrice}</b>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.leftContainer}>
              <label>Vælg camp</label>
              <select {...register("camp", { required: true })}>
                {camps?.items?.map((camp) => {
                  return <option value={camp.id}>{camp.name}</option>;
                })}
                {errors.camp && <span>This field is required</span>}
              </select>
              <label>Email</label>
              <input
                placeholder="email"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && <span>This field is required</span>}
              <label>Password</label>
              <input
                placeholder="password"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.Password && <span>This field is required</span>}
              <label>Gentag password</label>
              <input
                placeholder="Gentag password"
                type="password"
                {...register("password_repeat", { required: true })}
              />
              {errors.password_repeat && <span>This field is required</span>}
              <label>Navn</label>
              <input
                placeholder="Navn"
                type="text"
                {...register("name", { required: true })}
              />
              {errors.name && <span>This field is required</span>}
              <label>Adresse</label>
              <input
                placeholder="Adresse"
                type="text"
                {...register("address", { required: true })}
              />
              {errors.address && <span>This field is required</span>}
              <label>Postnummer</label>
              <input
                placeholder="Postnummer"
                type="number"
                {...register("postal_code", { required: true })}
              />
              {errors.postal_code && <span>This field is required</span>}
              <label>By</label>
              <input
                placeholder="By"
                type="text"
                {...register("city", { required: true })}
              />
              {errors.city && <span>This field is required</span>}
            </div>
            <div className={style.rightContainer}>
              <div>
                <label>Vælg forsendelsesmetode</label>
                <label>Jeg ønsker billeterne sendt</label>
                <input
                  type="radio"
                  value="paper"
                  {...register("shipping", { required: true })}
                />
                <label>Jeg udskriver billeterne selv</label>
                <input
                  type="radio"
                  value="print"
                  {...register("shipping", { required: true })}
                />
                {errors.shipping && <span>Vælg afsendelsesmetode</span>}
                <input type="submit" value="Send" />
              </div>
            </div>
          </form>
        </section>
      ) : isComplete ? (
        <div className={style.ticketComplete}>
          <h1>Tillykke</h1>
          <b>{message}</b>
          <NavLink to="/">Tilbage til forsiden</NavLink>
        </div>
      ) : (
        <NavLink to="/login">
          <h2>Du skal være logget ind for at bestille en billet</h2>
        </NavLink>
      )}
    </>
  );
};
