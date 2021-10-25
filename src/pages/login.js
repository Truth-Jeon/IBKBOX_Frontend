import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useCookies } from "react-cookie";
import {
  Form,
  Carousel,
} from "react-bootstrap";
import { UserContext } from "modules/contexts/common/userContext";

import "assets/styles/style.css";
import "assets/styles/reset.css";
import "assets/styles/login.css";
import "assets/styles/tooltip.css";

import HttpAction from "modules/utils/HttpAction";
import InstallToolTip from "components/installTooltip";

const Login = (props) => {
  const userContext = useContext(UserContext);

  //조작관련
  const history = useHistory();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["rememberId"]);
  const [resultmsg, setresultmsg] = useState(null);
  const [convert, setConvert] = useState(0);

  //로그인처리
  const signIn = () => {
    if (id === "") {
      rendermsg("id");
      return;
    }
    if (password === "") {
      rendermsg("password");
      return;
    }

    //로그인
    HttpAction({
      url: "login",
      method: "post",
      data: {
        userId: id,
        password: password,
      },
    }).then((data) => {
      if (data.code === 200) {
        localStorage.setItem("jwt", data.token);
        userContext.actions.getUserInfo(); //데이터 업데이트
        history.push("/main");
      } else {
        rendermsg("result", data.message);
      }
    });
  };

  //안내문구 목록
  const rendermsg = (type, msg = "") => {
    console.log(123123);
    if (type == "id") {
      setresultmsg("아이디를 입력해주세요");
    } else if (type == "password") {
      setresultmsg("비밀번호를 입력해주세요");
    } else {
      setresultmsg(msg);
    }
    return;
  };

  //
  const pressEnter = (e) => {
    if (e.key === "Enter") {
      signIn();
    }
  };

  //
  const pressUp = () => {
    setId(id.trim());
    setPassword(password.trim());
  };

  //
  const handleOnChange = (e) => {
    setIsRemember(e.target.checked);
    e.target.checked === true
      ? setCookie("rememberId", id, { maxAge: 21600000 })
      : removeCookie("rememberId");
  };

  const checkId = () => {
    id ? setConvert(1) : alert("아이디나 전화번호를 입력하세요");
  };

  const checkPassword = () => {
    console.log(123123);
    password ? signIn() : alert("비밀번호를 입력하세요");
  };

  useEffect(() => {
    if (cookies.rememberId !== undefined) {
      setId(cookies.rememberId);
      setIsRemember(true);
    }
  }, []);

  //
  useEffect(() => {
    setresultmsg(null);
  }, [id, password]);

  //
  return (
    <>
      <div className="bg__wrap">
        <div className="bg__container">
          <div className="left__loginbg">
            <img
              src={require("assets/images/login_leftimg.png").default}
              alt="login left img"
            />
          </div>
          <div className="right__login">
            <div className="login__container">
              <a href="#" className="login__logo">
                <img
                  src={require("assets/images/logo_long.png").default}
                  alt="login logo"
                />
              </a>
              <Form className="login__input">
                <h2>로그인</h2>
                <Carousel
                  keyboard={false}
                  controls={false}
                  interval={null}
                  activeIndex={convert}
                >
                  <Carousel.Item>
                    <Form.Control
                      type="text"
                      placeholder="아이디/휴대폰"
                      onChange={(e) => setId(e.target.value)}
                      onKeyPress={pressEnter}
                      onKeyUp={pressUp}
                      value={id}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <Form.Control
                      type="password"
                      placeholder="비밀번호"
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={pressEnter}
                      onKeyUp={pressUp}
                      value={password}
                    />
                  </Carousel.Item>
                </Carousel>
              </Form>

              <button
                className="btn--base bg-full"
                onClick={convert == 1 ? checkPassword : checkId}
              >
                로그인
              </button>
              <div className="easy__login">
                <h2>간편로그인</h2>
                <button className="btn--base">인증서 실행</button>
                <ul>
                  <li>
                    <a href="#">
                      아이디찾기
                      <img
                        src={
                          require("assets/images/login_right_arrow.png")
                            .default
                        }
                        alt="right arrow"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      비밀번호 찾기
                      <img
                        src={
                          require("assets/images/login_right_arrow.png")
                            .default
                        }
                        alt="right arrow"
                      />
                    </a>
                  </li>
                  <li>
                    <Link to={'/member/join'}>
                      {/* <a href="#"> */}
                      회원가입
                      <img
                        src={
                          require("assets/images/login_right_arrow.png")
                            .default
                        }
                        alt="right arrow"
                      />
                    </Link>
                    {/* </a> */}
                  </li>
                </ul>
              </div>
              <div className="qr__login">
                <h2>QR 로그인</h2>
                <ul>
                  <li>
                    <img
                      src={
                        require("assets/images/login_qrlogin.png").default
                      }
                      alt="qr login"
                    />
                    <p>
                      <span>IBK BOX 모바일 앱</span>에서 빠르게 로그인 하세요.
                    </p>
                  </li>
                  <li className="qr__code">
                    <img
                      src={
                        require("assets/images/login_qrcode.png").default
                      }
                      alt="qr code"
                    />
                    <p>
                      남은시간 <span>2분 59초</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="skip">        
          <div className="skip__btn">
            <img src={require("assets/images/skip_ellipsis.png").default} alt="skip btn" />
            <div className="tooltip__container">
              <div className="tooltip">
                  aFDADF
                <p className="tooltip__title">보안 프로그램</p>
                <p className="tooltip__text">
                  안전한 서비스 이용을 위하여
                  <br />
                  <span>필수 보안프로그램</span>을 설치하세요.
                </p>
                <a href="#">
                  바로가기
                  <img
                    src={
                      require("assets/images/tooltip_right_arrow.png")
                        .default
                    }
                    alt="tooltip arrow"
                  />
                </a>
              </div>
            </div>
          </div>
        </div> */}
        <InstallToolTip />
      </div>
    </>
  );
};
export default Login;
