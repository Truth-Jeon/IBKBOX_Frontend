import { dateTimeFormat } from "modules/utils/Common";

const NewsScrapItem = (props) => {
  const { id, title, description, location, userName, reference, potal, date, type, comment} = props;
  const color = {
    pdf: "purple",
    scrap: "sky",
  };
  return (
    <div className={`news__card__inner card-${color[type]} scrap`} key={id}>
      <div className="scrap__trash">
        <img
          src={require("assets/images/trash.png").default}
          alt="휴지통"
          className="base"
        />
        <img
          src={require("assets/images/trash_hover.png").default}
          alt="휴지통"
          className="hover"
        />
      </div>
      <p className="news__title">{title}</p>
      <p className="news__subtitle">
        {description}
      </p>
      <div className="scrap__util">
        <div className="scrap__util__left">
          <img
            src={require("assets/images/name_icon.png").default}
            alt="아이콘"
          />
          <div className="util__sort">
            <p className="location">{location}</p>
            <p className="name">{userName}</p>
          </div>
        </div>
        <div className="scrap__util__right">
          <p className="scrap__util__right__text">
            {comment}
          </p>
        </div>
      </div>
      <div className="scrap__kinds">
        <div className="kinds__left">
          <p className={`sort text-${color[type]}`}>{reference}</p>
          <p className="portal">{potal}</p>
        </div>
        <p className="news__date">{date}</p>
      </div>
    </div>
  );
};

export default NewsScrapItem;
