import "@google/model-viewer";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"model-viewer": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				src: string;
				"camera-controls"?: boolean;
				"touch-action"?: string;
				"ktx2-transcoder-location"?: string;
				"shadow-intensity"?: string;
				"auto-rotate"?: boolean;
				exposure?: string;
				"tone-mapping"?: string;
				rotation?: string;
				alt?: string;
			};
		}
	}
}

function FishModelViewer() {
	return (
		<model-viewer
			camera-controls
			touch-action="pan-y"
			src="borrego_cimarron.glb"
			ktx2-transcoder-location="https://www.gstatic.com/draco/v1/decoders/"
			alt="A 3D model of a catwife"
			shadow-intensity="1"
			// auto-rotate
			exposure="1"
			tone-mapping="neutral"
			rotation="0 180 0"
		></model-viewer>
	);
}

export default FishModelViewer;
