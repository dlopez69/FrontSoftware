// src/App.tsx
import { useState, useEffect } from "react";
import FishModelViewer from "./components/ModelViewer";
import Button from "./components/Button";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import AudioRecorder from "./components/AudioRecorder";
import TextToSpeech from "./components/TextToSpeech"; // Importa el nuevo componente
import "./styles/Chat.css";
import "./App.css";

interface Message {
	message: string;
	type: "sent" | "received";
}

const App = () => {
	const [mostrarSidebar, setMostrarSidebar] = useState(true);
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [messages, setMessages] = useState<Message[]>([
		{ message: "Hola", type: "sent" },
		{ message: "¿Cómo estás?", type: "received" },
	]);

	// Función para añadir un nuevo mensaje al chat
	const addMessage = (message: string, type: "sent" | "received") => {
		setMessages((prevMessages) => [...prevMessages, { message, type }]);
	};

	// Función para manejar el mensaje enviado por el usuario
	const handleSendMessage = (message: string) => {
		addMessage(message, "sent");        // Mensaje del usuario
		addMessage(message, "received");    // Respuesta automática
	};

	const handleHover = () => {
		setMostrarSidebar(true);
	};

	const toggleChat = () => {
		setIsChatOpen(!isChatOpen);
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			<Navbar />
			{mostrarSidebar && <Sidebar handleHover={handleHover} />}
			<header>
				<FishModelViewer />
			</header>
			<div>
				<AudioRecorder onTextRecorded={handleSendMessage} />
			</div>
			{isMobile && (
				<button className="chat-toggle-button" onClick={toggleChat}>
					{isChatOpen ? "▼" : "▲"}
				</button>
			)}
			{!isMobile && (
				<button className="chat-toggle-button-desktop" onClick={toggleChat}>
					{isChatOpen ? "Cerrar Chat" : "Abrir Chat"}
				</button>
			)}
			<Chat isOpen={isChatOpen} messages={messages} />
			{/* Agrega el componente TextToSpeech para cada mensaje recibido */}
			{messages.map((msg, index) =>
				msg.type === "received" ? (
					<TextToSpeech key={index} text={msg.message} />
				) : null
			)}
		</>
	);
};

export default App;
