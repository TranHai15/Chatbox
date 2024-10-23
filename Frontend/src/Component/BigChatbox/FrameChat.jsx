import Contnent from "./Contnent";
import InputMessage from "./InputMessage";
import { createContext, useState } from "react";

export const DataMessageContext = createContext();
export default function FrameChat() {
  const [submittedMessage, setSubmittedMessage] = useState(null); // Biến lưu message sau khi submit
  const [active, setActive] = useState("true"); //bien de luu tru kiem tra gia tri de laod ding
  return (
    <DataMessageContext.Provider
      value={{ submittedMessage, setSubmittedMessage, active, setActive }}
    >
      <div className="bg-[#3C3C3C] h-screen  ">
        <div className="w-8/12 mx-auto ">
          <div>
            <Contnent />
          </div>
          <div className="fixed bottom-2 left-64 right-64  ">
            <InputMessage />
          </div>
        </div>
      </div>
    </DataMessageContext.Provider>
  );
}
