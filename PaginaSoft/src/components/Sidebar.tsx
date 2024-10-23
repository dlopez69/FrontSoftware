import { useState } from "react";
import "../styles/Sidebar.css";
import List from "./List";

type Props = {
	handleHover: () => void;
};

const Sidebar = ({ handleHover }: Props) => {
	const [selectedItem, setSelectedItem] = useState<string>("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleClick = (item: string) => {
		setSelectedItem(item);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const opciones = [
		{
			nombre: "Perfil",
			icono: "fa-user",
			href: "#",
			opcion: "Perfil",
		},
		{
			nombre: "Configuracion",
			opcion: "Configuracion",
			icono: "fa-cog",
			href: "#",
		},
	];

	return (
		<div
			onMouseEnter={handleHover}
			className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
			style={{ width: "280px" }}
		>
			<a
				href="app.tsx"
				className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
			>
				<svg className="bi pe-none me-2" width="40" height="32">
					<use href="logo3.png"></use>
				</svg>
				<span className="fs-4">CimaChat</span>
			</a>
			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item" onClick={() => handleClick("home")}>
					<a
						href="#"
						className={`nav-link ${
							selectedItem === "home" ? "active" : "text-white"
						}`}
						aria-current="page"
					>
						<svg className="bi pe-none me-2" width="16" height="16">
							<use href="#home"></use>
						</svg>
						Conversacion atual
					</a>
				</li>
				<li className="nav-item" onClick={() => handleClick("dashboard")}>
					<a
						href="#"
						className={`nav-link ${
							selectedItem === "dashboard" ? "active" : "text-white"
						}`}
					>
						<svg className="bi pe-none me-2" width="16" height="16">
							<use href="#speedometer2"></use>
						</svg>
						Conversacion 1
					</a>
				</li>
				<li className="nav-item" onClick={() => handleClick("orders")}>
					<a
						href="#"
						className={`nav-link ${
							selectedItem === "orders" ? "active" : "text-white"
						}`}
					>
						<svg className="bi pe-none me-2" width="16" height="16">
							<use href="#table"></use>
						</svg>
						Conversacion 2
					</a>
				</li>

				<li className="nav-item" onClick={() => handleClick("products")}>
					<a
						href="#"
						className={`nav-link ${
							selectedItem === "products" ? "active" : "text-white"
						}`}
					>
						<svg className="bi pe-none me-2" width="16" height="16">
							<use href="#grid"></use>
						</svg>
						Conversacion 3
					</a>
				</li>
				<li className="nav-item" onClick={() => handleClick("customers")}>
					<a
						href="#"
						className={`nav-link ${
							selectedItem === "customers" ? "active" : "text-white"
						}`}
					>
						<svg className="bi pe-none me-2" width="16" height="16">
							<use href="#people-circle"></use>
						</svg>
						Conversacion 4
					</a>
				</li>
			</ul>
			<hr />
			<div className="dropdown">
				<a
					href="#"
					className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
					onClick={toggleDropdown}
					aria-expanded={isDropdownOpen}
				>
					<img
						src="https://github.com/mdo.png"
						alt=""
						width="32"
						height="32"
						className="rounded-circle me-2"
					/>
					<strong>mdo</strong>
				</a>
				<ul
					className={`dropdown-menu dropdown-menu-dark text-small shadow ${
						isDropdownOpen ? "show" : ""
					}`}
				>
					<List opciones={opciones} />
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
