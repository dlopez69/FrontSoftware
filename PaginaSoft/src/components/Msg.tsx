// Msg.tsx
import "../styles/Msg.css";

type Props = {
	message: string;
	type: "sent" | "received"; // Tipo de mensaje, si es enviado o recibido
};

const Msg = (props: Props) => {
	return (
		<div className={`msg-container ${props.type}`}>
			<p>{props.message}</p>
		</div>
	);
};

export default Msg;
