import React, { useState } from "react";
import "../styles/AudioRecorder.css";
const AudioRecorder: React.FC<{ onTextRecorded: (text: string) => void }> = ({
	onTextRecorded,
}) => {
	const [recording, setRecording] = useState(false);
	let recognition: any;

	if ("webkitSpeechRecognition" in window) {
		recognition = new (window as any).webkitSpeechRecognition();
	} else {
		console.error("Reconocimiento de voz no soportado en este navegador.");
		return null;
	}

	recognition.lang = "es-MX"; // Cambiado a español de México
	recognition.continuous = false;
	recognition.interimResults = false; // Solo resultados finales

	recognition.onresult = (event: any) => {
		const transcript = event.results[0][0].transcript;
		console.log("Texto detectado:", transcript);
		onTextRecorded(transcript);
		setRecording(false); // Asegurarse de que la grabación se detenga
	};

	recognition.onerror = (event: any) => {
		console.error("Error de reconocimiento:", event.error);
		setRecording(false);
	};

	const startRecording = () => {
		try {
			setRecording(true);
			recognition.start();
		} catch (error) {
			console.error("Error al iniciar la grabación:", error);
			setRecording(false);
		}
	};

	const stopRecording = () => {
		setRecording(false);
		recognition.stop();
	};

	return (
		<div className="audio-recorder-container">
			<button className="btn btn-dark" onClick={startRecording}>
				{recording ? "Detener grabación" : "Iniciar grabación"}
			</button>
		</div>
	);
};

export default AudioRecorder;
