import React from 'react';

import 'assets/styles/reset.css';
import 'assets/styles/login.css';
import 'assets/styles/tooltip.css';
import 'assets/styles/join.css';
import 'assets/styles/selfAuth.css';

const SelfAuthModal = (props) => {

    return (
        <div className="modal">
            <div className="modal__container">
                <div className="modal__content">
                    <img src="/images/selfauth_model.png" alt="모델" />
                    <div className="already">
                        <img src="/images/logo_long.png" alt="투자박스" />
                        <p className='already__title'>이미 <span>가입 <img src="/images/yellow_check.png" alt="노란 체크" /></span>하셧습니다.</p>

                        <div className="already__info">
                            <div className="info">
                                <div className="info__left">
                                    <p className='sort'>-가입일</p>
                                    <p className='value'>2021-07-21</p>
                                </div>
                            </div>
                            <div className="info">
                                <div className="info__left">
                                    <p className='sort'>-아이디</p>
                                    <p className='value idbold'>04948diufj</p>
                                </div>
                                <button>비밀번호 재설정</button>
                            </div>
                        </div>
                        <span className='sub__text'>다양한 서비스 혜택을 위해 BOX에 로그인 하세요.</span>
                        <button className="btn--base bg-full">로그인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelfAuthModal;