import { useState } from "react";

type Opcion = {
	opcion: string;
	href: string;
};

type ListProps = {
	opciones: Opcion[];
};

const List = ({ opciones }: ListProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<li className="nav-item dropdown">
				<a
					className={`nav-link dropdown-toggle ${isOpen ? "show" : ""}`}
					href="#"
					role="button"
					onClick={toggleDropdown}
					aria-expanded={isOpen}
				>
					Menú
				</a>
				<ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
					{opciones.map((opcion, index) => (
						<li key={index}>
							<a className="dropdown-item" href={opcion.href}>
								{opcion.opcion}
							</a>
						</li>
					))}
				</ul>
			</li>
		</>
	);
};

export default List;
