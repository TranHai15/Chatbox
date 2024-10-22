import { useState, useRef, useEffect, useContext } from "react";
import { DataMessageContext } from "./FrameChat"; // Import context từ FrameChat.js

export default function InputMessage() {
  const [message, setMessage] = useState(""); // Khởi tạo message trống
  const { setSubmittedMessage, active, setActive } =
    useContext(DataMessageContext); // Lấy hàm setActive từ context
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    // Điều chỉnh chiều cao của textarea khi message thay đổi
    if (textarea) {
      textarea.style.height = "auto"; // Reset chiều cao
      textarea.style.height = textarea.scrollHeight + "px"; // Điều chỉnh chiều cao dựa trên nội dung
      textarea.scrollTop = textarea.scrollHeight; // Tự động cuộn lên
    }
  }, [message]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const submitMessage = () => {
    if (active == "false") {
      return;
    } else {
      if (message.length === 0) {
        alert("Vui lòng nhập câu hỏi");
      } else {
        setSubmittedMessage(message); // Cập nhật giá trị sau khi submit vào context
        setMessage(""); // Xóa nội dung sau khi gửi
      }
    }
  };

  return (
    <div className="bg-[#3C3C3C] h-auto max-h-[10rem] flex flex-col-reverse justify-start">
      <div className="w-full mx-auto">
        <div className="container flex flex-1 relative items-end bg-white rounded-3xl">
          <div className="w-[95%] bg-white rounded-3xl">
            <textarea
              ref={textareaRef}
              className="w-full max-h-32 h-full py-3 pl-5 p-2 rounded-3xl resize-none outline-none"
              rows={1}
              value={message} // Hiển thị nội dung hiện tại của message
              onChange={handleInputChange}
              placeholder="Nhập tin nhắn..."
            />
          </div>
          <button
            className="w-9 flex-none absolute right-2 bottom-2"
            onClick={submitMessage} // Chỉ khi nhấn mới gửi dữ liệu
          >
            {active === "true" ? (
              <img
                className="w-full object-contain"
                src="../../../src/assets/submit.svg"
                alt="submit"
              />
            ) : (
              <img
                className="w-full object-contain"
                src="../../../src/assets/submit-load.png"
                alt="submit"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
