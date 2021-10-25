import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/common/news/Card";
import ScrapCard from "components/common/news/ScrapCard";
import ScrapButton from "components/common/news/ScrapButton";
import { updateTitle } from "modules/utils/Common";
import BreadCrumbs from "components/breadCrums";

import dumy from "./dumy";

import "assets/styles/style.css";
import "assets/styles/reset.css";
import "assets/styles/news.css";
import "assets/styles/common.css";

const News = (props) => {
  const title = "뉴스";
  useEffect(() => updateTitle(title), []);

  return (
    <div className="main__content__container">
      <div className="sub__container">
        <BreadCrumbs beforeTitle={[]}  menuList={[title]} mainTitle={title} path={props.location.pathname} icon={'scrap_img'} btnText={'화면순서설정'}/>
        <div className="news__content__cover">
          <div className="news__content">
            <div className="news__info">
              <div className="news__info__title">IBK 뉴스레터</div>
              <Link
                to={{
                  pathname: "/main/news/newsletter",
                  state: { beforeTitle: [title], mainTitle: title },
                }}
              >
                <div className="news__info__more">
                  <img src={"/images/more_plus.png"} alt="more btn" />
                  더보기
                </div>
              </Link>
            </div>
            <div className="news__card__cover">
              <div className="news__card__container">
                <div className="news__card__container">
                  <div className="news__card">
                    {dumy.map((data, index) => {
                      const { type, topic, title, date, tags } = data;
                      return (
                        <Card
                          key={index}
                          type={type}
                          topic={topic}
                          title={title}
                          date={date}
                          tags={tags}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="news__content news__content__mt">
            <div className="news__info">
              <div className="news__info__title">뉴스 스크랩</div>
              <Link
                to={{
                  pathname: "/main/news/newsscrap",
                  state: { beforeTitle: [title] },
                }}
              >
                <div className="news__info__more">
                  <img src="/images/more_plus.png" alt="more btn" />
                  더보기
                </div>
              </Link>
            </div>

            <div className="news__card__cover">
              <div className="news__card__container">
                <div className="news__card">
                  {dumy && dumy.length != 0 ? (
                    <>
                      {dumy.map((data, index) => {
                        const { type, date, topic, title, subtitle } = data;
                        return (
                          <ScrapCard
                            key={index}
                            type={type}
                            date={date}
                            topic={topic}
                            title={title}
                            subtitle={subtitle}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <ScrapButton />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default News;
