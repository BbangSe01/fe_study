// Controller -> 요청을 어떻게 처리할지 관리
const { crowHeadlinesFromNaver } = require("../naver_crolling");
const cdb = require("../Database/crollingDb");

//DB에 데이터를 삽입하는 메소드
module.exports.insertCrawledData = async (req, res) => {
  try {
    //새로고침 시, 기존 데이터 삭제를 위한 코드
    const deleteQuery = "DELETE FROM items";
    cdb.query(deleteQuery, (err, results) => {
      if (err) {
        console.error("데이터 삭제 실패: " + err.stack);
        return res.status(500).json({ error: "데이터 삭제 실패" });
      }
      console.log("기존 데이터 삭제 성공");
    });

    //데이터 삽입 코드
    const data = await crowHeadlinesFromNaver();

    if (!data || !Array.isArray(data)) {
      console.error("잘못된 데이터 형식:", data);
      return res.status(500).json({ error: "잘못된 데이터 형식" });
    }

    data.forEach((news) => {
      const insertQuery = `INSERT INTO items (title, preview, publisher) VALUES (?, ?, ?) 
                           ON DUPLICATE KEY UPDATE preview=VALUES(preview), publisher=VALUES(publisher)`; // 기본키인 title 중복 시, preview/publisher 업데이트

      cdb.query(
        insertQuery,
        [news.title, news.preview, news.where],
        (err, results, fields) => {
          if (err) {
            console.error("데이터 삽입 실패: " + err.stack);
            return;
          }
          console.log(`${news.title} 데이터 삽입 성공`);
        }
      );
    });

    res.json({ message: "크롤링된 데이터가 성공적으로 저장되었습니다." });
  } catch (error) {
    console.error("크롤링 데이터 삽입 중 오류 발생:", error);
    res.status(500).send("크롤링 데이터 삽입 실패");
  }
};

// DB로부터 데이터를 받아오는 메소드
module.exports.getData = async (req, res) => {
  try {
    // 데이터베이스에서 데이터 조회
    const selectQuery = "SELECT * FROM items";

    cdb.query(selectQuery, (err, results, fields) => {
      if (err) {
        console.error("데이터 조회 실패: " + err.stack);
        return res.status(404).send("404 NOT_FOUND");
      }

      // 조회된 데이터 반환
      res.json(results);
    });
  } catch (error) {
    console.error("데이터 조회 중 오류 발생:", error);
    res.status(500).send("데이터 조회 실패");
  }
};
