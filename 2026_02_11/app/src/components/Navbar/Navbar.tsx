import styles from './Navbar.module.scss'
// import { NavLink, Link } from "react-router";

export default function Navbar() {
    return (
        <nav className={styles.Navbar}>
            <ul>
                <li>
                    <a href="/">Strona główna</a>
                </li>
                <li>
                    <a href="/posts">Blog</a>
                </li>
                <li>
                    <a href="/categories">Kategorie</a>
                </li>
            </ul>
        </nav>
    )
}