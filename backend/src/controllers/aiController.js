const aiModel = require("../models/aiModel");

const aiController = {
  processMessage: async (message) => {
    try {
      const response = await aiModel.getAIResponse(message);
      return response;
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu dến Al", error);
      return [{ type: "AI", text: "Có lỗi xảy ra, vui lòng thử lại sau." }];
    }
  },
};

module.exports = aiController;
