const express = require("express");
const aiController = require("../controllers/aiController");

const router = express.Router();

router.post("/ai", async (req, res) => {
  const message = req.body.message;
  const response = await aiController.processMessage(message);
  res.json(response);
});

module.exports = (app) => {
  app.use("/", router);
};
