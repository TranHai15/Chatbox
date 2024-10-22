import { useState, useEffect, useContext } from "react";
import { DataMessageContext } from "./FrameChat"; // Import context

export default function Content() {
  const [Message, SetMessages] = useState([]);
  const { submittedMessage, active, setActive } =
    useContext(DataMessageContext); // Lấy trạng thái loading từ context
  // them tin nhan vao khung chat va gui du lieu len
  useEffect(() => {
    if (submittedMessage) {
      SetMessages((oldMessages) => [
        ...oldMessages,
        { type: "user", text: submittedMessage }, // Thêm tin nhắn mới vào danh sách
      ]);

      // Bắt đầu xử lý trạng thái loading
      setActive("false");
      setTimeout(() => {
        fetch("http://localhost:3000/cauhoiuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: submittedMessage }),
        })
          .then((res) => res.json()) // Chờ kết quả gửi tin nhắn thành công
          .then(() => {
            // Sau khi gửi thành công, gọi API lấy câu trả lời từ AI

            return fetch("http://localhost:3000/testAl");
          })

          .then((res) => res.json()) // Chờ phản hồi từ AI
          .then((data) => {
            //   console.log(...data);
            // Thêm phản hồi của AI vào danh sách tin nhắn
            SetMessages((prevMessages) => [
              ...prevMessages,
              ...data, // Giả định API trả về trường 'response'
            ]);
            // Tắt trạng thái loading khi đã nhận được phản hồi
            setActive("true");
          })
          .catch((error) => {
            console.error("Lỗi:", error);
            setActive("true"); // Tắt loading nếu có lỗi
          });
      }, 3000);
    }
  }, [submittedMessage]);

  //   lay du lieu tu al
  useEffect(() => {
    fetch("http://localhost:3000/Al")
      .then((res) => res.json())
      .then((data) => {
        SetMessages((prevMessages) => [...prevMessages, ...data]);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <main className="pt-3 w-full">
          <section className="w-full bg-black px-4 pb-5 rounded-lg h-[34rem] overflow-x-auto mb-5">
            {active === "false" ? (
              <p className="text-white">Loading...</p>
            ) : (
              " "
            )}
            {Message.map((text, index) => (
              <div
                key={index}
                className={`w-full flex min-h-8 mb-4 mt-3 ${
                  text.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {text.type === "Al" && (
                  <div className="w-8 h-auto top-0 relative">
                    <span className="logo flex-none w-8 absolute top-0 rounded-full">
                      <img
                        className="w-full rounded-full object-contain"
                        src="https://cdn.pixabay.com/photo/2017/06/10/12/46/bee-2389834_1280.png"
                      />
                    </span>
                  </div>
                )}

                <div className="flex items-center">
                  <p
                    className={`flex-auto w-full max-w-3xl h-auto ${
                      text.type === "user"
                        ? "bg-[#fefefe] font-sans rounded-lg text-black p-3"
                        : "text-white ml-2"
                    }`}
                  >
                    {text.text}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
