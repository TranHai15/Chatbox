const Controller = require("../Controller/Controller");

const RouterHome = (app) => {
  // dinh nghia loi chao the gioi
  app.get("/", (req, res) => {
    res.send("Hello word");
  });
  // dinh ngia router nhan cau hoi
  app.post("/new", Controller.newQuestion);
};

module.exports = RouterHome;
