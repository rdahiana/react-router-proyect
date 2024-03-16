import { Link } from "react-router-dom";

export default function DefaultLayout({ children }) {
  return (
    <div className="container">
      <header className="header">
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/registrar">Registrarse</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main">{children}</main>
      </div>
  );
}