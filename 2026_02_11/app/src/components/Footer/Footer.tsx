import styles from './Footer.module.scss'

export default function Footer() {
    return (
        <footer className={styles.Footer}>
            Copyright &copy; {new Date().getFullYear()} | Wiktor Kycia
        </footer>
    )
}
