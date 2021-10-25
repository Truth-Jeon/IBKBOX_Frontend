import React from 'react';
import 'assets/styles/news.css'
import 'assets/styles/common.css'

const ScrapButton = () => {
    return(
        <div className="news__scrap">
            <div className="explane">
                <div className="text">
                    <img src="/images/ex_mark.png" alt="Exclamation mark" />
                    <p>
                    IBK BOX 이용약관   ㅣ   개인(신용)정보 수집ㆍ이용 동의   ㅣ   개인정보 제3자 제공 동의(상품서비스 안내 등)   ㅣ   상품서비스 안내(선택) 등 에 모두 동의합니다.
                    </p>
                </div>
                <img src="/images/blue_close.png" alt="close btn" />
            </div>

            <div className='btn-scrap-cover'>
                <button className="btn-scrap">
                    <img src={require("assets/images/news_scrap.png").default} alt="스크랩 이미지" />
                    스크랩 작성
                </button>
            </div>
    </div>
    )
}

export default ScrapButton;