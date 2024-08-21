// Router -> 어떤 요청이 발생했는지 관리
const express = require("express");
const router = express.Router();
const path = require("path");
const newsController = require("../controllers/newsController");

router.get("/", (req, res) => {
  // localhost:3000에 접속 시 homepage.html을 불러옴.
  res.sendFile(path.join(__dirname, "../public", "homepage.html"));
});

router.get("/get-data", newsController.getData);
router.get("/push-db", newsController.insertCrawledData);

module.exports = router;
