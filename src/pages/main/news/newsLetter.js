import React, { useEffect, useState } from "react";

import { updateTitle } from 'modules/utils/Common'
import NewsAllList from './components/newsAllList'

import "assets/styles/style.css";
import "assets/styles/reset.css";
import "assets/styles/news.css";
import "assets/styles/common.css";

const News = (props) => {
  
  useEffect(()=>updateTitle("뉴스"), []);
  return (
    <div className="main__content__container">
      <div className="sub__container">
        <div className="sub__info">
          <div className="sub__info__text">
            <div className="sub__info__title">뉴스</div>
            <div className="sub__info__location">
              <img
                src={require("assets/images/sub_home_img.png").default}
                alt="home img"
              />
              <img
                src={require("assets/images/sub_right_arrow.png").default}
                alt="right arrow"
                className="px10"
              />
              <p>뉴스</p>
            </div>
          </div>
          <div className="sub__info__order">
            <img
              src={require("assets/images/ordersetting.png").default}
              alt="화면 순서 설정 이미지"
            />
            화면순서설정
          </div>
        </div>
        <div className="news__content__cover">
          <NewsAllList/>
        </div>
      </div>
    </div>
  );
};

export default News;
