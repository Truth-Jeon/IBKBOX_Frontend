import JoinProgress from 'components/JoinProgress'


import 'assets/style/reset.css'
import 'assets/style/login.css'
import 'assets/style/tooltip.css'
import 'assets/style/join.css'
import 'assets/style/selfAuth.css'


const selfAuth = () => {
    return (
        <>
             <div className="long__logo">
                <img src="/image/logo_long.png" alt="logo long" />
            </div>
            <div className='bg__wrap join__wrap auth1__wrap'>
                <div className='join__container'>
                    <div className="join__width">
                        <JoinProgress />
                        <p className="join__title">본인인증</p>
                        <div className='join__same__box'>
                            <div className="title">
                                <input type="checkbox" id="box1" /><label for="box1"><p>전체동의</p></label>
                            </div>

                            <div className="explane">
                                <div className="text">
                                    <img src="/image/ex_mark.png" alt="Exclamation mark" />
                                    <p>관련법률 및 규정에 따라 아래 사항에 대한 동의가 필요합니다.</p>
                                </div>
                                <img src="/image/blue_close.png" alt="close btn" />
                            </div>

                            <div className="agreement">
                                <ul>
                                    <li>
                                        <div className="checkbox__text">
                                            <input type="checkbox" id="box2" /><label for="box2">개인정보이용 동의</label>
                                        </div>
                                        <div className="view">내용보기</div>
                                    </li>
                                    <li>
                                        <div className="checkbox__text">
                                            <input type="checkbox" id="box3" /><label for="box3">고객식별정보처리 동의</label>
                                        </div>
                                        <div className="view">내용보기</div>
                                    </li>
                                    <li className="mt10">
                                        <div className="checkbox__text">
                                            <input type="checkbox" id="box4" /><label for="box4">통신사이용약관 동의</label>
                                        </div>
                                        <div className="view">내용보기</div>
                                    </li>
                                    <li className="mt10">
                                        <div className="checkbox__text">
                                            <input type="checkbox" id="box5" /><label for="box5">서비스이용약관 동의</label>
                                        </div>
                                        <div className="view">내용보기</div>
                                    </li>
                                </ul>
                            </div>
                            <div className='input__group'>
                                <div className='input__group__cover'>
                                    <div className='input__box'>
                                        <p>이름</p>
                                        <input type="text" placeholder="이름 직접입력" />
                                    </div>
                                </div>
                                <div className='input__group__cover inputgroup__two'>
                                    <div className='input__box'>
                                        <p>이름</p>
                                        <div className="people">
                                            <div className="active">내국인</div>
                                            <div>외국인</div>
                                        </div>
                                    </div>
                                    <div className='input__box'>
                                        <p>성별</p>
                                        <div className="people">
                                            <div className="active">남자</div>
                                            <div>여자</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='input__group__cover'>
                                    <div className='input__box'>
                                        <p>생년월일</p>
                                        <input type="text" placeholder="YYYYMMDD" />
                                    </div>
                                </div>
                                <div className='input__group__cover inputgroup__three'>
                                    <div className='input__box'>
                                        <p>휴대전화</p>
                                        <div className='phone'>
                                            <select>
                                                <option disabled selected>선택</option>
                                                <option>SKT</option>
                                                <option>SKT</option>
                                                <option>SKT</option>
                                                <option>SKT</option>
                                                <option>SKT1111</option>
                                            </select>
                                            <input type="text" placeholder="-없이 입력" />
                                            <button>인증번호 전송</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='input__group__cover'>
                                    <div className='input__box'>
                                        <p>
                                            인증번호
                                            <span>03 : 00</span>
                                        </p>
                                        <input type="text" placeholder="인증번호 6자리 입력" />
                                    </div>
                                </div>
                            </div>

                            {/* 입력이 다 되면 확인 버튼 .btn-confirm 에 addclass btn-on 해주세요. */}
                            <button className='btn-confirm'>확인</button>
                        </div>
                    </div>
                </div>

                <div className="skip">
                    <div className="skip__btn">
                        <img src="/image/skip_ellipsis.png" alt="skip btn" />
                        <div className="tooltip__container selfauth1">
                            <div className="tooltip_box">
                                <img src="/image/ex_mark_yellow.png" alt="느낌표" className="ex_mark" />
                                <p className="tooltip__text">
                                    회원가입을 위해 <span>본인확인</span>이 필요합니다.<br />
                                    본인명의가 아닐경우 인증이 이루어지지<br />
                                    않습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="modal">
                    <div className="modal__container">
                        <div className="modal__content">
                            <img src="/image/selfauth_model.png" alt="모델" />
                            <div className="already">
                                <img src="/image/logo_long.png" alt="투자박스" />
                                <p className='already__title'>이미 <span>가입 <img src="/image/yellow_check.png" alt="노란 체크" /></span>하셧습니다.</p>

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
                </div> */}
            </div>
        </>
    )
}
export default selfAuth;

