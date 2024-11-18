import { useState } from "react";
import useWebSocket from "react-use-websocket";

const socketUrl = "ws://127.0.0.1:8000/ws/test";

const Server = () => {
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    onClose: () => console.log("closed"),
    onError: () => console.log("error"),
    onMessage: (msg) => {
      // const data = JSON.parse(msg.data);
      setMessage(msg.data);
    },
  });
  const sendInputValue = () => {
    const message = { text: "hello" };
    sendJsonMessage(message);
    setInputValue("");
  };
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={sendInputValue}>Send Hello</button>
      <div>Recieved data: {message}</div>
    </div>
  );
};

export default Server;
