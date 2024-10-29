import { ReactNode } from "react";
import "../styles/Button.css";

type Props = {
	children: ReactNode;
	onClick: () => void;
};

const Button = (props: Props) => {
	return (
		<button type="button" className="btn-color" onClick={props.onClick}>
			{props.children}
		</button>
	);
};

export default Button;
