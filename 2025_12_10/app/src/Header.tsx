import { NavLink, Link } from "react-router";

export default function Header() {
    return (
        <nav>
            {/* NavLink makes it easy to show active states */}
            <NavLink to="/">
                {({ isActive }) => (
                    <span className={isActive ? "active" : ""}>
                      {isActive ? "👉" : ""} Home
                    </span>
                )}
            </NavLink>
            <NavLink to="/dashboard">
                {({ isActive }) => (
                    <span className={isActive ? "active" : ""}>
                      {isActive ? "👉" : ""} Dashboard
                    </span>
                )}
            </NavLink>

            <Link to="/users">Users</Link>
        </nav>
    );
}
