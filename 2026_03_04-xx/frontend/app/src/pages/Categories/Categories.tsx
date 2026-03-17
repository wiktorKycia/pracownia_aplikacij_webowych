import styles from './Categories.module.scss'

export default function Categories() {
    const categories: string[] = ['Filmy', 'Książki', 'Fotografia']

    return (
        <div className={styles.Categories}>
            <h1 className={styles.CategoriesHeading}>Kategorie</h1>
            <ul className={styles.CategoriesList}>
                {categories.map(category => (
                    <li key={category}><a href={"#"}>{category}</a></li>
                ))}
            </ul>
        </div>
    )
}