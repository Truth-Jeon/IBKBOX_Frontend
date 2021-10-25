import React, { useContext } from 'react';
import { UserContext } from "modules/contexts/common/userContext";


const Banner = () => {
    const userContext = useContext(UserContext);
    const { userData } = userContext.state.userInfo;
    console.log(userData)

    return (
        <div className="header">
            <div className="header__container">
                <div className="header__slide">
                    <div className="header__slide__btn">
                        <img src={require("assets/images/top_arrow.png").default} alt="top arrow" />
                        <img src={require("assets/images/header_pagestop.png").default} alt="pause" className="pause" />
                        <img src={require("assets/images/bottom_arrow.png").default} alt="bottom arrow" />
                    </div>
                    <div className="header__slide__text">
                        <p>직원을 초대하세요. 출퇴근 관리와 고용지원금을 <span>신청</span>할 수 있습니다.</p>
                    </div>
                </div>
                <div className="header__util">
                    <div className="header__item">
                        <ul>
                            <li>
                                <img src={require("assets/images/header_icon1.png").default} alt="header icon" />
                                <div className="item__badge blue">5</div>
                            </li>
                            <li>
                                <img src={require("assets/images/header_icon2.png").default} alt="header icon" />
                                <div className="item__badge gray">4</div>
                            </li>
                            <li>
                                <img src={require("assets/images/header_icon3.png").default} alt="header icon" />
                                <div className="item__badge orange">3</div>
                            </li>
                            <li>
                                <img src={require("assets/images/header_icon4.png").default} alt="header icon" />
                            </li>
                        </ul>
                    </div>
                    <div className="header__user">
                        <p>{userData.name}</p>
                        <img src={require("assets/images/userimg.png").default} alt="user img" />
                    </div>
                    <div className="header__plugin">
                        <img src={require("assets/images/header_plugin.png").default} alt="header plugin img" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
