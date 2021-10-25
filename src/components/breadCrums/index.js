import { Link } from "react-router-dom";

const BreadCrumbs = (props) => {
  const { menuList, path, beforeTitle, mainTitle, icon, btnText, btnAction } = props;
  const _path = path.split("/");
  const img = icon? require(`assets/images/${icon}.png`).default : null;
  let baseUrl = `/main`;
  _path.shift();
  _path.shift();

  return (
    <div className="sub__info">
      <div className="sub__info__text">
        <div className="sub__info__title">{mainTitle}</div>
        <div className="sub__info__location">
          <Link to={{ pathname: "/"}}>
            <img
              src={require("assets/images/sub_home_img.png").default}
              alt="home img"
            />
          </Link>
          {menuList && menuList.length > 0 ? (
            <>
              {_path.map((url, index) => {
                baseUrl = `${baseUrl}/${url}`;
                return (
                  <>
                    <img
                      src={require("assets/images/sub_right_arrow.png").default}
                      alt="right arrow"
                      className="px10"
                    />
                    <Link 
                    to={{ pathname: baseUrl, state:{ beforeTitle: [...beforeTitle] } }}>
                      <p>{menuList[index]}</p>
                    </Link>
                  </>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
      {icon?
      <div className="sub__info__order" onClick={btnAction}>
        <img
          src={img}
          alt={btnText}
        />
        {btnText}
      </div>
      :null
      }
    </div>
  );
};

export default BreadCrumbs;
