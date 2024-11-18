import { useState } from "react";
import useWebSocket from "react-use-websocket";

const socketUrl = "ws://127.0.0.1:8000/ws/test";

const Server = () => {
  const [newMessage, setNewMessage] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    onClose: () => console.log("closed"),
    onError: () => console.log("error"),
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setNewMessage((prev_msg) => [...prev_msg, data.new_message]);
    },
  });

  return (
    <div>
      {newMessage.map((msg, index) => {
        return (
          <div key={index}>
            <p>{msg}</p>
          </div>
        );
      })}
      <form>
        <label>
          Enter Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      </form>
      <button
        onClick={() => {
          sendJsonMessage({ type: "message", message });
          setMessage("");
        }}
      >
        Send Message
      </button>
    </div>
  );
};

export default Server;
