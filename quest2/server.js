const express = require("express");
const path = require("path"); // 파일과 디렉터리 경로를 다루기 위한 유틸리티를 제공하는 Node.js의 기본 모듈
const cors = require("cors"); // 브라우저 보안 기능으로, 다른 출처의 리소스에 대한 요청을 제어
// const { crowHeadlinesFromNaver } = require("./naver_crolling");
const newsRoute = require("./routes/newsRoute");

const app = express();
const port = 3000;

// CORS 설정, 모든 출처에서의 요청 허용
app.use(cors());

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, "public")));

// newsRoute 불러오기
app.use("/", newsRoute);

app.listen(port, () => {
  console.log(`서버가 실행되었습니다. 접속주소: http://localhost:${port}`);
});
