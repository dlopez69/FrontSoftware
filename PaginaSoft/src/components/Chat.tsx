// Chat.tsx
import "../styles/Chat.css";
import Msg from "./Msg";

interface ChatProps {
	messages: { message: string; type: "sent" | "received" }[];
	isOpen: boolean;
}

function Chat({ messages, isOpen }: ChatProps) {
	return (
		<div className={`chat-container ${isOpen ? "open" : ""}`}>
			<div className="chat-header">CimaChat</div>
			<div className="chat-messages">
				{messages.map((msg, index) => (
					<Msg key={index} message={msg.message} type={msg.type} />
				))}
			</div>
			<div className="chat-input">
				<input type="text" placeholder="Escribe un mensaje..." />
				<button>Enviar</button>
			</div>
		</div>
	);
}

export default Chat;
