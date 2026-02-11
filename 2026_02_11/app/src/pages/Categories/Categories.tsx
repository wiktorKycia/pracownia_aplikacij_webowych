import styles from './Categories.module.scss'

export default function Categories() {
    const categories: string[] = ['Filmy', 'Książki', 'Fotografia']

    return (
        <>
            <h1 className={styles.Heading}>Kategorie</h1>
            <ul className={styles.List}>
                {categories.map(category => (
                    <li key={category}><a href={"#"}>{category}</a></li>
                ))}
            </ul>
        </>
    )
}