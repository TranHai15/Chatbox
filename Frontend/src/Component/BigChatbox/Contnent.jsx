import { useState, useEffect, useContext, useRef } from "react";
import { DataMessageContext } from "./FrameChat"; // Import context

export default function Content() {
  const [Message, SetMessages] = useState([]);
  const { submittedMessage, active, setActive } =
    useContext(DataMessageContext); // Lấy trạng thái loading từ context

  // Tạo reference để cuộn xuống cuối khi có tin nhắn mới
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (submittedMessage) {
      SetMessages((oldMessages) => [
        ...oldMessages,
        { type: "user", text: submittedMessage },
      ]);
      setActive("false");

      setTimeout(() => {
        const dataText = {
          type: "user",
          text: submittedMessage,
        };

        fetch("http://localhost:5000/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataText),
        })
          .then((res) => res.json())
          .then((data) => {
            SetMessages((prevMessages) => [...prevMessages, ...data]);
            scrollToBottom();
            setActive("true");
            // console.log(...data);
          });
      }, 3000);
    }
  }, [submittedMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [Message]);

  return (
    <div>
      <div className="container">
        <main className="pt-3 w-full">
          <section className="w-full bg-black px-4 pb-5 rounded-lg max-h-[35rem] overflow-y-auto mb-5">
            <div className="flex items-center h-9 mt-3 ">
              <div className="w-8 h-auto  top-0 ">
                <span className="logo flex-none w-8  rounded-full">
                  <img
                    className="w-full rounded-full object-contain"
                    src="https://cdn.pixabay.com/photo/2017/06/10/12/46/bee-2389834_1280.png"
                  />
                </span>
              </div>
              <div className="flex items-center">
                <p
                  className={`flex-auto w-full max-w-3xl h-auto text-white "text-white ml-2`}
                >
                  Xin chao toi co the giup gi duoc cho ban
                </p>
              </div>
            </div>
            {Message.map((text, index) => (
              <div key={index}>
                <div
                  className={`w-full flex min-h-8 mb-4 mt-3 ${
                    text.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {text.type === "Al" && (
                    <div className="w-8 h-auto  top-0 relative">
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

                {active === "false" && index === Message.length - 1 ? (
                  <div className="w-8 h-auto flex top-0 relative">
                    <span className="logo flex-none w-8 absolute top-0 rounded-full">
                      <img
                        className="w-full rounded-full object-contain"
                        src="https://cdn.pixabay.com/photo/2017/06/10/12/46/bee-2389834_1280.png"
                      />
                    </span>
                    <p className="text-white ml-10"> ... </p>
                  </div>
                ) : (
                  " "
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </section>
        </main>
      </div>
    </div>
  );
}
