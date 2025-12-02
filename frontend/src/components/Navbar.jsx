import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link to="/" style={{ fontWeight: "bold", textDecoration: "none" }}>
        My Portfolio
      </Link>
      <div style={{ display: "flex", gap: "1rem" }}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          Home
        </NavLink>
        <NavLink to="/about" style={{ textDecoration: "none" }}>
          About
        </NavLink>
        <NavLink to="/resume" style={{ textDecoration: "none" }}>
          Resume
        </NavLink>
        <NavLink to="/portfolio" style={{ textDecoration: "none" }}>
          Portfolio
        </NavLink>
        <NavLink to="/contact" style={{ textDecoration: "none" }}>
          Contact
        </NavLink>
      </div>
    </nav>
  );
}
