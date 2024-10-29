import { useState, useEffect } from "react";
import FishModelViewer from "./components/ModelViewer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import AudioRecorder from "./components/AudioRecorder";
import Loading from "./components/Loading";
import "./styles/Chat.css";
import "./App.css";

interface Message {
	id: number;
	message: string;
	type: "sent" | "received";
	fromVoice: boolean; // Nuevo campo para identificar si proviene de voz
}

const App = () => {
	const [mostrarSidebar, setMostrarSidebar] = useState(true);
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Agregar mensajes al chat
	const addMessage = (
		message: string,
		type: "sent" | "received",
		fromVoice: boolean = false
	) => {
		setMessages((prev) => [
			...prev,
			{ id: prev.length + 1, message, type, fromVoice },
		]);
	};

	// Manejo de envío de mensaje
	const handleSendMessage = async (
		message: string,
		fromVoice: boolean = false
	) => {
		if (!message.trim()) return;

		// Agregamos el mensaje del usuario al chat
		addMessage(message, "sent", fromVoice);

		try {
			const response = await fetch(
				"https://chatbot-uabc-api-production.up.railway.app/api/chatbot/openai-chat/",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						client_id: Math.random().toString(36).substr(2, 9),
						message: message,
					}),
				}
			);

			if (!response.ok) throw new Error("Error al obtener la respuesta");

			const data = await response.json();
			const botResponse = data.response;

			// Agregar la respuesta del bot al chat
			addMessage(botResponse, "received", fromVoice);

			// Solo reproducir la respuesta del bot si proviene de un mensaje hablado
			if (fromVoice) speakText(botResponse);
		} catch (error) {
			console.error("Error:", error);
			addMessage("Error al conectar con el chatbot.", "received");
		}
	};

	// Función para reproducir texto usando TTS
	const speakText = (text: string) => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "es-MX";
		utterance.rate = 1.5;
		utterance.pitch = 1.5;
		utterance.volume = 1;
		window.speechSynthesis.cancel();
		window.speechSynthesis.speak(utterance);
	};

	// Detectar cambio de tamaño de pantalla
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Simular carga inicial
	useEffect(() => {
		const timeout = setTimeout(() => setIsLoading(false), 2000);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<>
			{isLoading ? (
				<Loading size={80} />
			) : (
				<>
					<Navbar />
					{mostrarSidebar && (
						<Sidebar handleHover={() => setMostrarSidebar(true)} />
					)}
					<header>
						<FishModelViewer />
					</header>

					<div>
						{/* Componente de grabación de voz */}
						<AudioRecorder
							onTextRecorded={(text) => handleSendMessage(text, true)}
						/>
					</div>

					{isMobile ? (
						<button
							className="chat-toggle-button"
							onClick={() => setIsChatOpen(!isChatOpen)}
						>
							{isChatOpen ? "▼" : "▲"}
						</button>
					) : (
						<button
							className="chat-toggle-button-desktop"
							onClick={() => setIsChatOpen(!isChatOpen)}
						>
							{isChatOpen ? "Cerrar Chat" : "Abrir Chat"}
						</button>
					)}

					<Chat
						isOpen={isChatOpen}
						messages={messages}
						onSendMessage={(message) => handleSendMessage(message, false)}
					/>
				</>
			)}
		</>
	);
};

export default App;
