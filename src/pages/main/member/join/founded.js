import React, { useState } from 'react';

import 'assets/styles/reset.css'
import 'assets/styles/login.css'
import 'assets/styles/tooltip.css'
import 'assets/styles/join.css'
import 'assets/styles/selfAuth.css'
import 'assets/styles/terms.css'
import 'assets/styles/account.css'
import 'assets/styles/register.css'
import 'assets/styles/founded.css'


const Founded = ({ joinProps }) => {

    // props
    const { setStepKey, joinData, setJoinData, setValidationModal, setAgreementModal } = joinProps;

    // list
    const [fieldList, setFieldList] = useState([
        { title: '제조업', id: 0 },
        { title: '도소매업', id: 1 },
        { title: '부동산업', id: 2 },
        { title: '음식점 및 숙박업', id: 3 },
        { title: '건설업', id: 4 },
        { title: '소프트웨어 및 인쇄출판업', id: 5 },
        { title: '서비스업', id: 6 },
        { title: '운송창고업', id: 7 },
        { title: '기타', id: 8 },
    ]);
    const [regionList, setRegionList] = useState([
        { name: '서울', id: 0 },
        { name: '경기/인천', id: 1 },
        { name: '강원', id: 2 },
        { name: '충청', value: 3 },
        { name: '전라', value: 4 },
        { name: '경상', value: 5 },
    ]);

    const inputChange = (key, value) => {
        let temp = { ...joinData };
        temp[key] = value;
        setJoinData(temp);
    }


    return (
        <>

            <p className="join__title">사업자 정보등록</p>
            <div className='join__same__box'>
                <div className="join__same__box__cover">
                    <p className="register__tit">
                        예비창업 <span>정보 입력</span>
                    </p>
                </div>

                {/* 창업분야에 선택이 되면 field__item 밑 li에 active 클래스를 add 해주세요.
                            ex) li className="active" */}

                <div className="field">
                    <p className="field__tit">창업분야</p>
                    <ul className='field__item'>
                        {
                            fieldList.map((e, key) => {
                                return (
                                    <li key={key}
                                        className={e.id === joinData.field ? 'active' : ''}
                                        onClick={() => { inputChange('field', e.id) }}>{e.title}</li>
                                )
                            })
                        }
                    </ul>
                </div>


                <div className='input__group'>
                    <div className='input__group__cover inputgroup__three field__select'>
                        <div className='input__box'>
                            <p>창업 지역</p>
                            <div className='phone'>
                                <select defaultValue={joinData.region}
                                    onClick={e => {
                                        inputChange('region', e.target.value);
                                    }}>
                                    <option value='default' disabled>선택</option>
                                    {
                                        regionList.map((e, key) => {
                                            return (
                                                <option key={key} value={e.name}>{e.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* datapicker인지 어떤 방식인지 정말 dropbox인지 체크 */}
                    <div className='input__group__cover inputgroup__three field__select'>
                        <div className='input__box'>
                            <p>창업 예정일</p>
                            <div className='phone'>
                                <select>
                                    <option disabled selected>선택</option>
                                    <option>SKT</option>
                                    <option>SKT</option>
                                    <option>SKT</option>
                                    <option>SKT</option>
                                    <option>SKT1111</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 선택이 다 되었으면 확인버튼에 check-on class 붙여주세요. */}
                <div className="button__group btn-mt30">
                    <button className="btn-confirm prev" onClick={() => { setStepKey('REGISTER') }}>이전</button>
                    <button
                        className={`btn-confirm check ${(joinData.field !== '' && joinData.region !== 'default') ? 'check-on' : ''}`}
                        onClick={() => { setStepKey('FINISH') }}>확인</button>
                </div>
            </div>

            <div className="skip">
                <div className="skip__btn">
                    <img src="/images/skip_ellipsis.png" alt="skip btn" />
                    <div className="tooltip__container selfauth1 tooltip__list">
                        <div className="tooltip_box">
                            <img src="/images/ex_mark_yellow.png" alt="느낌표" className="ex_mark" />
                            <p className="tooltip__text">
                                입력하신 정보를 기반으로 <span>정책자금 추천</span><br /> 및 <span>맞춤서비스가 제공</span>됩니다.
                            </p>
                        </div>
                        <div className="tooltip_box">
                            <img src="/images/ex_mark_yellow.png" alt="느낌표" className="ex_mark" />
                            <p className="tooltip__text">
                                맞춤 서비스를 위해 정확한 창업분야<br /> 선택과 정보입력이 필요합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Founded;

