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

	recognition.lang = "es-MX";
	recognition.continuous = false;
	recognition.interimResults = false;

	recognition.onresult = (event: any) => {
		const transcript = event.results[0][0].transcript;
		console.log("Texto detectado:", transcript);
		onTextRecorded(transcript);
		setRecording(false);
	};

	recognition.onerror = (event: any) => {
		console.error("Error de reconocimiento:", event.error);
		if (event.error === "aborted") {
			console.log("La grabación fue abortada.");
		} else if (event.error === "no-speech") {
			console.log("No se detectó discurso.");
		}
		setRecording(false);
	};

	recognition.onend = () => {
		console.log("Reconocimiento finalizado.");
		setRecording(false);
		setTimeout(() => {
			if (recording) {
				recognition.start(); // Reiniciar si se estaba grabando
			}
		}, 1000); // Espera 1 segundo antes de reiniciar
	};

	const startRecording = () => {
		if (recording) return; // No iniciar si ya está grabando

		console.log("Iniciando grabación...");
		try {
			setRecording(true);
			recognition.start();
		} catch (error) {
			console.error("Error al iniciar la grabación:", error);
			setRecording(false);
		}
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
