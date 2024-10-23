import React, { useState, useRef } from "react";
import "../styles/AudioRecorder.css";

interface AudioRecorderProps {
	onAudioRecorded: (audioBlob: Blob) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioRecorded }) => {
	const [recording, setRecording] = useState(false);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunks = useRef<Blob[]>([]);

	const startRecording = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorderRef.current = new MediaRecorder(stream);
		mediaRecorderRef.current.ondataavailable = (event) => {
			audioChunks.current.push(event.data);
		};

		mediaRecorderRef.current.onstop = () => {
			const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
			onAudioRecorded(audioBlob);
			audioChunks.current = []; // Limpia los chunks después de enviar
		};

		mediaRecorderRef.current.start();
		setRecording(true);
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setRecording(false);
		}
	};

	return (
		<div className="audio-recorder-container">
			<button
				className="btn btn-dark"
				onClick={recording ? stopRecording : startRecording}
			>
				{recording ? "Detener grabación" : "Iniciar grabación"}
			</button>
		</div>
	);
};

export default AudioRecorder;
