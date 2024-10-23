// src/App.tsx
import { useState, useEffect } from "react";
import FishModelViewer from "./components/ModelViewer";
import Button from "./components/Button";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import AudioRecorder from "./components/AudioRecorder";
import "./styles/Chat.css";
import "./App.css";

// Definición del tipo de mensaje
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

	// Función para enviar audio al servidor
	const sendAudioToServer = async (audioBlob: Blob) => {
		const formData = new FormData();
		formData.append("audio", audioBlob, "audio.wav");

		try {
			const response = await fetch("http://localhost:5000/procesar_audio", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Error en la respuesta del servidor");
			}

			const data = await response.json();
			addMessage(data.transcripcion, "sent"); // Añade el mensaje recibido al chat
		} catch (error) {
			console.error("Error al conectar con el servidor:", error);
			addMessage("Error al procesar el audio", "received");
		}
	};

	// Función para añadir un nuevo mensaje al chat
	const addMessage = (message: string, type: "sent" | "received") => {
		setMessages((prevMessages) => [...prevMessages, { message, type }]);
	};

	// Manejar el audio grabado y enviarlo al servidor
	const handleAudioRecorded = (audioBlob: Blob) => {
		sendAudioToServer(audioBlob); // Enviar el audio al servidor
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
				<AudioRecorder onAudioRecorded={handleAudioRecorded} />
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
		</>
	);
};

export default App;
