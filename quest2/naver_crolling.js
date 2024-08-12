const axios = require("axios");
const cheerio = require("cheerio"); // 파싱을 위한 모듈, HTML 문서를 로드하여 DOM 요소를 조작할 수 있게 해줌

const getHTML = async () => {
  try {
    return await axios.get("https://news.naver.com/section/105"); //네이버 IT/과학 분야 주소
  } catch (err) {
    console.log(err);
  }
};

const crowHeadlinesFromNaver = async () => {
  try {
    const html = await getHTML();
    const $ = cheerio.load(html.data);
    const $HeadlineList = $(".sa_item._SECTION_HEADLINE");

    let Headlinecourses = [];
    $HeadlineList.each((idx, node) => {
      Headlinecourses.push({
        title: $(node).find(".sa_text_strong").text(),
        preview: $(node).find(".sa_text_lede").text(),
        where: $(node).find(".sa_text_press").text(),
      });
    });

    console.log("Parsed Data:", Headlinecourses); // 데이터 확인용 로그 추가
    return Headlinecourses;
  } catch (error) {
    console.error("Error in parsing function:", error);
    throw error; // 에러를 다시 throw하여 클라이언트에게 500 오류로 반환되도록 함
  }
};

module.exports = { crowHeadlinesFromNaver };
