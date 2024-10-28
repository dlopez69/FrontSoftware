import { useState } from "react";
import "../styles/Chat.css";
import Msg from "./Msg";
import Loader from "./Loader"; // Importamos el Loader

interface ChatProps {
	messages: { id: number; message: string; type: "sent" | "received" }[];
	isOpen: boolean;
}

function Chat({ messages, isOpen }: ChatProps) {
	const [inputValue, setInputValue] = useState("");
	const [chatMessages, setChatMessages] =
		useState<ChatProps["messages"]>(messages);
	const [loading, setLoading] = useState(false); // Estado para indicar si la petición está en curso

	const generateRandomId = () => Math.floor(10000 + Math.random() * 90000);

	const handleSendMessage = async () => {
		if (inputValue.trim() === "") return;

		const newMessage = {
			id: generateRandomId(),
			message: inputValue,
			type: "sent" as const, // o type: "sent" as "sent"
		};

		setChatMessages((prev) => [...prev, newMessage]);
		setInputValue("");

		try {
			setLoading(true);

			// Ajustamos el cuerpo de la solicitud con 'client_id' y 'message'
			const response = await fetch(
				"https://chatbot-uabc-api-production.up.railway.app/api/chatbot/openai-chat/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						client_id: generateRandomId(), // Reemplaza "12345" con el ID correspondiente
						message: inputValue,
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json(); // Ver más detalles del error
				console.error("Detalles del error:", errorData);
				throw new Error(`Error: ${errorData.message || "Solicitud inválida"}`);
			}

			const data = await response.json();

			const chatbotMessage = {
				id: generateRandomId(),
				message: data.response,
				type: "received" as const, // o simplemente type: "received"
			};

			setChatMessages((prev) => [...prev, chatbotMessage]);
		} catch (error) {
			console.error("Error:", error);

			const errorMessage = {
				id: generateRandomId(),
				message: "Hubo un error al conectarse con el chatbot.",
				type: "received" as const, // o simplemente type: "received"
			};

			setChatMessages((prev) => [...prev, errorMessage]);
		} finally {
			setLoading(false);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSendMessage();
		}
	};

	return (
		<div className={`chat-container ${isOpen ? "open" : ""}`}>
			<div className="chat-header">CimaChat</div>
			<div className="chat-messages">
				{chatMessages.map((msg, index) => (
					<Msg key={index} message={msg.message} type={msg.type} />
				))}
				{loading && <Loader />} {/* Mostrar animación de escritura */}
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
