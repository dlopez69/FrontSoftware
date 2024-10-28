import React, { useEffect, useState } from 'react';

interface TextToSpeechProps {
    text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        availableVoices.forEach(voice => {
            console.log(`Voz: ${voice.name}, Idioma: ${voice.lang}`);
        });
    };

    useEffect(() => {
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []); // Solo ejecutar una vez al cargar el componente

    useEffect(() => {
        const utterance = new SpeechSynthesisUtterance(text || "Hola, esto es una prueba de síntesis de voz.");
        utterance.lang = 'es-MX';

        const selectedVoice = voices.find(voice => voice.name === 'Microsoft Raul - Spanish (Mexico)') || voices[0];
        utterance.voice = selectedVoice;

        utterance.rate = 1.5; // Velocidad
        utterance.pitch = 1.5; // Tono
        utterance.volume = 1; // Volumen

        // Reproduce el texto si hay voces cargadas
        if (text && voices.length > 0) {
            window.speechSynthesis.speak(utterance);
        }
    }, [text, voices]); // Ejecutar cuando cambian el texto o las voces

    return null; // No renderiza nada en la interfaz
};

export default TextToSpeech;
