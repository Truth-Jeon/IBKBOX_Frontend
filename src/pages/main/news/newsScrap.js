import React, { useEffect, useState } from "react";

import dumy from "./dumyScrap";
import { updateTitle } from "modules/utils/Common";
import NewsScrapItem from "./components/NewsScrapItem";
import "assets/styles/style.css";
import "assets/styles/reset.css";
import "assets/styles/news.css";
import "assets/styles/common.css";
import "assets/styles/newsAllList.css";
import "assets/styles/newsScrap.css";

const NewsScrap = (props) => {
  const [menu, setMenu] = useState("ALL");
  const [_dumy, setDumy] = useState([...dumy]);

  useEffect(() => updateTitle("뉴스"), []);
  return (
    <div className="main__content__container">
      <div className="sub__container">
        <div className="sub__info">
          <div className="sub__info__text">
            <div className="sub__info__title">뉴스</div>
            <div className="sub__info__location">
              <img src={require("assets/images/sub_home_img.png").default} alt="home img" />
              <img
                src={require("assets/images/sub_right_arrow.png").default}
                alt="right arrow"
                className="px10"
              />
              <p>뉴스</p>
              <img
                src={require("assets/images/sub_right_arrow.png").default}
                alt="right arrow"
                className="px10"
              />
              <p>뉴스스크랩</p>
            </div>
          </div>
          <div className="sub__info__order">
            <img
              src={require("assets/images/scrap_img.png").default}
              alt="search btn"
            />
            스크랩 작성
          </div>
        </div>
        <div className="news__content__cover">
          <div className="news__content">
            <div className="news__info">
              <div className="news__info__title">뉴스스크랩</div>
              <div className="news__info__more key_search">
                <input type="text" placeholder="키워드를 입력해주세요." />
                <img
                  src={require("assets/images/news_search.png").default}
                  alt="search btn"
                />
              </div>
            </div>
            <div className="news__card__cover">
              {/* 각각 리스트에 클릭하면 news__list__item + active 해주세요 */}
              <ul className="news__list">
                <li
                  className={`news__list__item ${
                    menu === "ALL" ? `active` : ""
                  }`}
                  onClick={() => {
                    setMenu("ALL");
                    setDumy([...dumy]);
                  }}
                >
                  <p>전체</p>
                  <span>1332</span>
                </li>
                <li
                  className={`news__list__item ${
                    menu === "SCRAP" ? `active` : ""
                  }`}
                  onClick={() => {
                    setMenu("SCRAP");
                    setDumy(dumy.filter((ele) => ele.type === "scrap"));
                  }}
                >
                  <p>뉴스스크랩</p>
                  <span>5</span>
                </li>
                <li
                  className={`news__list__item ${
                    menu === "PDF" ? `active` : ""
                  }`}
                  onClick={() => {
                    setMenu("PDF");
                    setDumy(dumy.filter((ele) => ele.type === "pdf"));
                  }}
                >
                  <p>PDF자료</p>
                  <span>5</span>
                </li>
              </ul>

              <div className="news__card__container newsAllList newsscrap">
                <div className="news__card">
                  {_dumy && _dumy.length != 0 ? (
                    <>
                      {_dumy.map((data) => (
                        <NewsScrapItem
                          id={data.id}
                          title={data.title}
                          location={data.location}
                          description={data.description}
                          userName={data.userName}
                          comment={data.comment}
                          portal={data.portal}
                          date={data.date}
                          type={data.type}
                        />
                      ))}
                    </>
                  ) : (
                    <div className="news__scrap">
                      <div className="explane">
                        <div className="text">
                          <img
                            src={require("assets/images/ex_mark.png").default}
                            alt="Exclamation mark"
                          />
                          <p>
                            스크랩을 등록해주세요. (관심 뉴스페이지 URL이나
                            PDF를 업로드하여 스크랩을 등록해 주세요.)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 뉴스스크랩 - PDF자료 삭제팝업 */}
              {/* <Modal
                        tit={"PDF자료"}
                        cont={"삭제하시겠습니까?"}
                    /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsScrap;
