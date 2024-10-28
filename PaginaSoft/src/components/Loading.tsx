import React from "react";
import "../styles/Loading.css";

const Logo = "/borrego-cimarron.png";

interface LoadingProps {
	size?: number; // Tamaño opcional del ícono
}

const Loading: React.FC<LoadingProps> = ({ size = 100 }) => {
	return (
		<div className="loading-container">
			<img
				src={Logo}
				className="loading-icon"
				style={{ width: size, height: size }}
				alt="Logo"
			/>
			<div className="spinner"></div>
		</div>
	);
};

export default Loading;
