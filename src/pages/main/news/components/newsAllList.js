import React, { useState } from "react";
import SpecialMaterialItem from "./SpecialMaterialItem";
import dumy from "../dumy";
import "assets/styles/newsAllList.css";

const NewsAllList = (props) => {
  const [menu, setMenu] = useState("ALL");
  const [_dumy, setDumy] = useState([...dumy]);
  return (
    <div className="news__content">
      <div className="news__info">
        <div className="news__info__title">IBK 전문자료</div>
        <div className="news__info__more key_search">
          <input type="text" placeholder="키워드를 입력해주세요." />
          <img
            src={require("assets/images/news_search.png").default}
            alt="search btn"
          />
        </div>
      </div>
      <div className="news__card__cover">
        <ul className="news__list">
          <li
            className={`news__list__item ${menu === "ALL" ? `active` : ""}`}
            onClick={() => {
              setMenu("ALL");
              setDumy([...dumy]);
            }}
          >
            <p>전체</p>
            <span>1332</span>
          </li>
          <li
            className={`news__list__item ${menu === "TIPS" ? `active` : ""}`}
            onClick={() => {
              setMenu("TIPS");
              setDumy(dumy.filter((ele) => ele.type === "tips"));
            }}
          >
            <p>은행업무Tip</p>
            <span>5</span>
          </li>
          <li
            className={`news__list__item ${menu === "REPORT" ? `active` : ""}`}
            onClick={() => {
              setMenu("REPORT");
              setDumy(dumy.filter((ele) => ele.type === "report"));
            }}
          >
            <p>IBK연구보고서</p>
            <span>5</span>
          </li>
          <li
            className={`news__list__item ${
              menu === "ECONOMIC" ? `active` : ""
            }`}
            onClick={() => {
              setMenu("ECONOMIC");
              setDumy(dumy.filter((ele) => ele.type === "economic"));
            }}
          >
            <p>경제/금융정보</p>
            <span>12</span>
          </li>
          <li
            className={`news__list__item ${menu === "MAGAZIN" ? `active` : ""}`}
            onClick={() => {
              setMenu("MAGAZIN");
              setDumy(dumy.filter((ele) => ele.type === "magazin"));
            }}
          >
            <p>매거진</p>
            <span>121</span>
          </li>
          <li
            className={`news__list__item ${
              menu === "FINANCIALMARKET" ? `active` : ""
            }`}
            onClick={() => {
              setMenu("FINANCIALMARKET");
              setDumy(dumy.filter((ele) => ele.type === "financialMarket"));
            }}
          >
            <p>금융시장동향</p>
            <span>1212</span>
          </li>
          <li
            className={`news__list__item ${
              menu === "CONSULTING" ? `active` : ""
            }`}
            onClick={() => {
              setMenu("CONSULTING");
              setDumy(dumy.filter((ele) => ele.type === "consulting"));
            }}
          >
            <p>컨설팅보고서/전문가컬럼</p>
            <span>12</span>
          </li>
          <li
            className={`news__list__item ${
              menu === "PROPERTY" ? `active` : ""
            }`}
            onClick={() => {
              setMenu("PROPERTY");
              setDumy(dumy.filter((ele) => ele.type === "property"));
            }}
          >
            <p>매각부동산</p>
            <span>5</span>
          </li>
        </ul>
        <div className="news__card__container newsAllList">
          <div className="news__card">
            {_dumy.map((data) => (
              <SpecialMaterialItem
                id={data.id}
                date={data.date}
                type={data.type}
                topic={data.topic}
                title={data.title}
                tags={data.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAllList;
