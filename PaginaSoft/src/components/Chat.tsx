import { useState } from "react";
import "../styles/Chat.css";
import Msg from "./Msg";
import Loader from "./Loader";

interface ChatProps {
	messages: { id: number; message: string; type: "sent" | "received" }[];
	isOpen: boolean;
	onSendMessage: (message: string) => void;
}

function Chat({ messages, isOpen, onSendMessage }: ChatProps) {
	const [inputValue, setInputValue] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSendMessage = async () => {
		if (inputValue.trim() === "") return;

		setLoading(true);
		await onSendMessage(inputValue); // Enviar mensaje
		setInputValue(""); // Limpiar input
		setLoading(false);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") handleSendMessage();
	};

	return (
		<div className={`chat-container ${isOpen ? "open" : ""}`}>
			<div className="chat-header">CimaChat</div>
			<div className="chat-messages">
				{messages.map((msg) => (
					<Msg key={msg.id} message={msg.message} type={msg.type} />
				))}
				{loading && <Loader />} {/* Mostrar animación de carga */}
			</div>
			<div className="chat-input">
				<input
					type="text"
					placeholder="Escribe un mensaje..."
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					disabled={loading}
				/>
				<button onClick={handleSendMessage} disabled={loading}>
					{loading ? "Enviando..." : "Enviar"}
				</button>
			</div>
		</div>
	);
}

export default Chat;
