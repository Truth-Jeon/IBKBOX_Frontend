import axios from 'axios';

//axios 기본설정
const HttpAction = axios.create({
    // baseURL: process.env.REACT_APP_API_URL, //요청 기본 url
    baseURL: "http://localhost:8100/",
    timeout: 300000 //5분
});

//오류설정
const ErrorHandler = (e) => {
    let error = e;

    console.log(e);
    //오류 기본값 추가
    //if (error.data === undefined) {
    if (e === undefined) {
        error = {
            data: 400,
            message: 'timeout error',
            path: '/'
        }
    }
    //REST API response 내용과 통일
    const response = {
        code: error.data.state,
        message: error.data.error,
        path: error.data.path
    }
    return response;
}

//로딩처리, components/common/Loading.js의 id값을 사용 및 App.js에 선언되어있는 상태
const loadingState = (state) => {
    const active = state === true ? "block" : "none";
    document.querySelector('#loadingstate').style.display = active;
}

//요청이 발생하는 경우
HttpAction.interceptors.request.use(function (config) {
    loadingState(true);//로딩 오픈
console.log("axios--->",config);
    //token이 없을때 Bearer null 로 넣으면 500에러로 발생으로 공백값 넣어줌
    const token = localStorage.getItem('jwt') === null ? "" : localStorage.getItem('jwt');
    config.headers["Authorization"] = `Bearer ${token}`;

    const fileused = config.fileused === undefined ? false : true;
    //파일업로드 요청인경우
    if (fileused) {
        config.headers["Content-Type"] = "multipart/form-data";
    }else{
        config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
}, function (e) {

    loadingState(false); //로딩 종료
    return ErrorHandler(e.response);
});

//요청이 완료된 경우
HttpAction.interceptors.response.use(function (response) {
    loadingState(false); //로딩 종료
    return response.data;
}, function (e) {
    loadingState(false); //로딩 종료
    return ErrorHandler(e.response);
});

export default HttpAction;