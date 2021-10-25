import { dateTimeFormat } from "modules/utils/Common";

const SpecialMaterialItem = (props) => {
  const { id, date, topic, title, tags, type } = props;
  const color = {
    tips: 'yellow',
    report: 'blue',
    economic: 'boldpurple',
    magazin: 'green',
    financialMarket: 'emerald',
    consulting: 'sky',
    property: 'gold'
  };
  return (
    <div className={`news__card__inner card-${color[type]}`} onClick={()=>console.log(id)}>
      <p className="news__date">{dateTimeFormat(date)}</p>
      <div className="news__allList__inner">
        <img
          src={require("assets/images/newslist_testimg.png").default}
          alt="search btn"
        />
        <div className="list__content__inner">
          <p className={`news__topic text-${color[type]}`}>{topic}</p>
          <p className="news__title">{title}</p>
          <ul className="news__related">
            {tags.map((tag) => (
              <li>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpecialMaterialItem;
