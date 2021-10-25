const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

//크로스 도메인 설정
module.exports = function (app){
    app.use(cors()); // cors 미들웨어 추가
    app.use(
        "/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst",
        createProxyMiddleware({
            target : "http://apis.data.go.kr",
            changeOrigin : true
        })
    )
}