import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';


const Index = () => {

    const [list, setList] = useState([]);
    const nowTime = moment().format('YYYYMMDD');

    //http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=V7aQQtrKknns60gR5FxZXx3ApZvcIrvGift93cxOiCLQvHLghjHbI3u%2F0CFJvdMa6poCqOQG9VWBcqrlQ6hbaA%3D%3D&numOfRows=10&dataType=JSON&pageNo=1&base_date=20210812&base_time=0600&nx=55&ny=127
    axios({
        url: `/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=V7aQQtrKknns60gR5FxZXx3ApZvcIrvGift93cxOiCLQvHLghjHbI3u%2F0CFJvdMa6poCqOQG9VWBcqrlQ6hbaA%3D%3D&numOfRows=10&dataType=JSON&pageNo=1&base_date=${nowTime}&base_time=0600&nx=55&ny=127`,
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        setList(JSON.stringify(response.data.response.body.items));
    });

    return (
        <>
            <h4>날씨데이터</h4>
            <p>기상청 동네예보 조회서비스</p>
            <p>api : https://data.kma.go.kr/api/selectApiDetail.do</p>
            {list}
        </>
    )
}

export default Index;