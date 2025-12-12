import { useChat } from "../hooks/useChat.js";
import { ChatMessage } from "./ChatMessage.jsx";
export function ChatRoom() {
  const { messages } = useChat();
  return (
    <div>
      {messages.map((message, index) => (
        <ChatMessage key={index} {...message} />
      ))}
    </div>
  );
}
