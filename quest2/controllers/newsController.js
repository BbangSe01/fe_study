// Controller -> 요청을 어떻게 처리할지 관리
const { crowHeadlinesFromNaver } = require("../naver_crolling");

module.exports.getData = async (req, res) => {
  try {
    const data = await crowHeadlinesFromNaver();
    console.log("Data received from parsing:", data); // 데이터 확인용 로그 추가

    if (!data || !Array.isArray(data)) {
      // if return 방식으로 함수 분리
      console.error("Invalid data format:", data);
      return res.status(500).json({ error: "Invalid data format" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Failed to fetch data");
  }
};
