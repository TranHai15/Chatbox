const ModleGetApi = require("../Model/ModelGetApi");

const Controller = {
  newQuestion: async (req, res) => {
    // lay du lieu dc gui tu body len
    const data = req.body;
    const dataAll = ModleGetApi.SendApi(data);

    console.log(dataAll);
    // lay thanh cong thi gui len cho Al xu ly
    const kq = await dataAll;
    return res.json(kq);
  },
};

module.exports = Controller;
