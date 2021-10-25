import { Link } from "react-router-dom";

import "assets/styles/reset.css";
import "assets/styles/login.css";
import "assets/styles/logout.css";
import "assets/styles/tooltip.css";

const Logout = () => {
  return (
    <>
      <div className="bg__wrap">
        <div className="logout__container">
          <img
            src={require("assets/images/logo_long.png").default}
            alt="logo"
          />
          <h2>
            <span>로그아웃</span> 되었습니다.
          </h2>
          <p>
            BOX 서비스를 이용해주셔서 감사합니다. <br />
            다시 이용하시려면 로그인 해주세요.
          </p>
          <div className="logout__btn">
            <Link to={"/"}>
              <button className="btn--base">홈으로</button>
            </Link>
            <Link to={"/login"}>
              <button className="btn--base bg-full">로그인</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Logout;
