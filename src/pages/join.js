import React, { useState, useEffect } from "react";
// import JoinProgress from '../../components/JoinProgress';
import JoinProgress from '../components/JoinProgress.js';
import '../assets/styles/join.css'
import '../assets/styles/reset.css'
import '../assets/styles/login.css'
import '../assets/styles/tooltip.css'
import '../assets/styles/join.css'
import '../assets/styles/selfAuth.css'
import '../assets/styles/terms.css'
import { check } from "yargs";


const Join = (props) => {

    const [checkConsent, setCheckConsent] = useState([]);

    useEffect(() => {
        let checkConsent = [ 
            {first:"[필수] BOX 이용약관 동의",
            second:"[필수] 개인(신용)정보, 고유식별정보 수집·이용 동의",
            third:"[선택] 개인정보 제3자 제공 동의(상품서비스 안내 등)",
            fourth:"[선택] 개인(신용)정보 수집·이용 동의(상품서비스 안내 등)",
            fifth:"[선택] 상품서비스 안내 수신 동의"}
        ];
        setCheckConsent(checkConsent);
    }, []);

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
                                    <p>
                                    IBK BOX 이용약관   ㅣ   개인(신용)정보 수집ㆍ이용 동의   ㅣ   개인정보 제3자 제공 동의(상품서비스 안내 등)   ㅣ   상품서비스 안내(선택) 등 에 모두 동의합니다.
                                    </p>
                                </div>
                                <img src="/image/blue_close.png" alt="close btn" />
                            </div>

                            <div className="agree">
                                <div className="agree__group">
                                    <div className="checkbox__text">
                                        <input type="checkbox" id="box2" /><label for="box2">[필수] BOX 이용약관 동의</label>
                                    </div>
                                    <div className="agree__text">
                                        텍스트
                                    </div>
                                </div>
                                <div className="agree__group">
                                    <div className="checkbox__text">
                                        <input type="checkbox" id="box3" /><label for="box3">[필수] 개인(신용)정보, 고유식별정보 수집ㆍ이용 동의</label>
                                    </div>
                                    <div className="agree__text">
                                        텍스트
                                    </div>
                                </div>
                                <div className="agree__group">
                                    <div className="checkbox__text">
                                        <input type="checkbox" id="box4" /><label for="box4">[선택] 개인정보 제3자 제공 동의(상품서비스 안내 등)</label>
                                    </div>
                                    <div className="agree__text">
                                        텍스트
                                    </div>
                                </div>
                                <div className="agree__group">
                                    <div className="checkbox__text">
                                        <input type="checkbox" id="box5" /><label for="box5">[선택] 개인(신용)정보 수집ㆍ이용 동의(상품서비스 안내 등)</label>
                                    </div>
                                    <div className="agree__text">
                                        텍스트
                                    </div>
                                </div>
                                <div className="agree__group">
                                    <div className="checkbox__text">
                                        <input type="checkbox" id="box6" /><label for="box6">[선택] 상품서비스 안내 수신 동의</label>
                                    </div>
                                    <div className="agree__text">
                                        텍스트
                                    </div>
                                </div>
                            </div>


                            {/* 동의에 체크가 다 되었으면 확인버튼에 check-on class 붙여주세요. */}
                            <div className="button__group">
                                <button className="btn-confirm prev">이전</button>
                                <button className="btn-confirm check">확인</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
export default Join;