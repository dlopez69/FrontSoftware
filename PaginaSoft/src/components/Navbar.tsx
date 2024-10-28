import "../styles/Navbar.css";
import List from "./List";
import { useState } from "react";

const opciones = [
	{ opcion: "Opción 1", href: "#" },
	{ opcion: "Opción 2", href: "#" },
	{ opcion: "Opción 3", href: "#" },
];

const Navbar = () => {
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);

	const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

	return (
		<div className="navbar-nav-container">
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<a className="navbar-brand" href="app.tsx">
						<img src="borrego-cimarron.png" alt="logo" />
					</a>
					<button
						className="navbar-toggler"
						type="button"
						onClick={handleNavCollapse}
						aria-expanded={!isNavCollapsed}
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<h1 className="text-center">CimaChat</h1>
					<div
						className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
						id="navbarContent"
					>
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<List opciones={opciones} />
						</ul>

						<form className="d-flex" role="search">
							<input
								className="form-control-dark me-2 "
								type="search"
								placeholder="Buscar"
								aria-label="Buscar"
							/>
							<button className="btn btn-outline-light" type="submit">
								Buscar
							</button>
						</form>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
