const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Babaline08308508@",
  database: "crollingdata",
});

// 서버에 연결
connection.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패: " + err.stack);
    return;
  }
  console.log("MySQL 연결 성공");

  //테이블 생성
  const createNewsTable = `
CREATE TABLE IF NOT EXISTS items (
title VARCHAR(100) NOT NULL PRIMARY KEY,
preview VARCHAR(200) NOT NULL,
publisher VARCHAR(20) NOT NULL
);
`;

  connection.query(createNewsTable, (err, results, fields) => {
    if (err) {
      console.error("테이블 생성 실패: " + err.stack);
      return;
    }
    console.log("items 테이블 생성 성공");
  });
});

module.exports = connection;
