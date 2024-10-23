import { ReactNode } from "react";
import CloseButton from "./CloseButton";

type Props = {
	children: ReactNode;
	onClick: () => void;
};

const Alert = ({ children, onClick }: Props) => {
	return (
		<div className="alert alert-dark" role="alert">
			<CloseButton onClick={onClick} />
			{children}
		</div>
	);
};

export default Alert;
