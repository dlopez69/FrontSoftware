// src/types/model-viewer.d.ts
declare module "@google/model-viewer" {
	interface ModelViewerElement extends HTMLElement {
		src: string;
		alt: string;
		cameraControls: boolean;
		touchAction: string;
		shadowIntensity: number;
		autoRotate: boolean;
		exposure: number;
		toneMapping: string;
		rotation: string;
		"ktx2-transcoder-location"?: string; // Propiedades personalizadas
		"shadow-intensity"?: number;
		"camera-controls"?: boolean;
		"touch-action"?: string;
		"auto-rotate"?: boolean;
	}

	const modelViewer: {
		prototype: ModelViewerElement;
		new (): ModelViewerElement;
	};

	export default modelViewer;
}
