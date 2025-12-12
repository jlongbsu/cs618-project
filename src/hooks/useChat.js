import { useState, useEffect } from "react";
import { useSocket } from "../contexts/SocketIOContext.jsx";
export function useChat() {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  function receiveMessage(message) {
    setMessages((messages) => [...messages, message]);
  }
  useEffect(() => {
    if (!socket) return;
    socket.on("recipe.added", receiveMessage);
    return () => socket.off("recipe.added", receiveMessage);
  }, []);
  function sendMessage(message) {
    socket.emit("recipe.added", message);
  }
  return { messages, sendMessage };
}
