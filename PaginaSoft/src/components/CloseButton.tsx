import "../styles/CloseButton.css";

const CloseButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button
			type="button"
			className="btn-close"
			aria-label="Close"
			onClick={onClick}
		></button>
	);
};

export default CloseButton;
