import React, { useState } from "react";
import "../styles/AudioRecorder.css";

const AudioRecorder: React.FC<{ onTextRecorded: (text: string) => void }> = ({ onTextRecorded }) => {
    const [recording, setRecording] = useState(false);
    const recognition = new (window as any).webkitSpeechRecognition();

    recognition.lang = "es-ES"; // Ajusta al idioma deseado
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTextRecorded(transcript); // Envía el texto al chat
    };

    const startRecording = () => {
        setRecording(true);
        recognition.start();
    };

    const stopRecording = () => {
        setRecording(false);
        recognition.stop();
    };

    return (
        <div className="audio-recorder-container">
            <button onClick={recording ? stopRecording : startRecording}>
                {recording ? "Detener grabación" : "Iniciar grabación"}
            </button>
        </div>
    );
};

export default AudioRecorder;
