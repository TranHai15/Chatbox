const ModleGetApi = {
  // Gửi câu hỏi lên cho AI
  SendApi: async (data) => {
    try {
      // Sử dụng await để chờ fetch trả về
      const res = await fetch("http://localhost:3000/newQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Kiểm tra xem đã gửi thành công chưa

      if (res.ok) {
        // Gửi thành công thì lấy câu trả lời từ AI
        const dataTraVe = await ModleGetApi.GetQuestion();

        // Kiểm tra xem dữ liệu trả về có không
        if (dataTraVe) {
          //   console.log("Dữ liệu trả về: ", dataTraVe);
          return dataTraVe; // Trả về dữ liệu sau khi xử lý
        } else {
          console.log("Dữ liệu chưa được trả về từ AI.");
          return null; // Trả về null nếu không có dữ liệu
        }
      } else {
        console.error("Không gửi được dữ liệu lên cho AI.");
        return null;
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu lên AI: ", error);
      return null;
    }
  },

  // Lấy dữ liệu phản hồi từ AI
  GetQuestion: async () => {
    try {
      // Chờ fetch phản hồi từ API
      const res = await fetch("http://localhost:3000/testAl");

      if (!res.ok) {
        console.error("Không lấy được dữ liệu phản hồi từ AI.");
        return null;
      }

      // Chuyển phản hồi thành JSON
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phản hồi từ AI: ", error);
      return null;
    }
  },
};

module.exports = ModleGetApi;
