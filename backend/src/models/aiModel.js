const aiModel = {
  getAIResponse: async (message) => {
    try {
      // Gửi yêu cầu tới API http://localhost:3000/Al với dữ liệu từ `message`
      const response = await fetch("http://localhost:3000/api/dataapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      // Kiểm tra xem phản hồi có thành công không
      if (response.ok) {
        // Gọi đến API để lấy dữ liệu
        // const mockApiResponse = await fetch("http://localhost:3000/testAl");
        const data = await response.json();
        return data;

        // Kiểm tra dữ liệu trả về
        // if (mockApiResponse.ok) {
        //   const data = await mockApiResponse.json(); // Phân tích cú pháp JSON

        //   // Nếu có dữ liệu, lấy thông tin
        //   if (data) {
        //     console.log(data); // In ra câu trả lời
        //     return data; // Trả về câu trả lời
        //   } else {
        //     return "Không có dữ liệu trả về từ AI.";
        //   }
        // } else {
        //   console.error("Error calling AI API:", mockApiResponse.status);
        //   return "Có lỗi xảy ra trong quá trình lấy dữ liệu từ AI.";
        // }
      } else {
        console.error("Error calling API, response status:", response.status);
        return "Có lỗi xảy ra trong quá trình gửi yêu cầu tới AI.";
      }
    } catch (error) {
      console.error("Error calling AI API:", error);
      return "AI hiện không thể trả lời, vui lòng thử lại sau.";
    }
  },
};

module.exports = aiModel;
