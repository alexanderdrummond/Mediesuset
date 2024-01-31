import { NewsCard } from "../../components/NewsCard/NewsCard";
import { Title } from "../../components/Title/Title";
import { useFetch } from "../../hooks/useFetch";
import style from "./Camppage.module.scss";

export const Camppage = () => {
  const camps = useFetch("https://api.mediehuset.net/mediesuset/camps");

  console.log(camps);

  return (
    <>
      <Title title={"Camps"} />
      <section className={style.campWrapper}>
        {camps?.items.map((item) => {
          const textContent = (
            <>
              <p>
                {item.name} er en camp med plads til {item.num_people}. Følgende
                armbånd giver adgang til denne camp:
              </p>
              <br />
              <ul>
                {item.tickets.map((item) => {
                  return <li>{item.name + " - " + item.price + " DKK"}</li>;
                })}
              </ul>
            </>
          );

          return (
            <NewsCard
              title={item.name}
              imgSrc={item.image}
              text={textContent}
            />
          );
        })}
      </section>
    </>
  );
};
