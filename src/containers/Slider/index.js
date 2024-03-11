import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus
    ?.slice()
    .sort((evtA, evtB) => (new Date(evtA.date) < new Date(evtB.date) ? -1 : 1));

  const nextCard = () => {
    if (byDateDesc && byDateDesc.length > 0) {
      setIndex((prevIndex) =>
        prevIndex + 1 < byDateDesc.length ? prevIndex + 1 : 0
      );
    }
  };

  useEffect(() => {
    const intervalId = setInterval(nextCard, 5000);
    return () => clearInterval(intervalId);
  }, [byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title + 1}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            {console.log(event.title + 1)}
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${radioIdx.toString()}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
