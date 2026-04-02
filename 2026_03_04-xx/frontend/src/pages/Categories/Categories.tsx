import styles from './Categories.module.scss'
import {useCategories} from "../../hooks/useCategories.ts";

export default function Categories() {
    const {data, isLoading, isError} = useCategories()

    const categories = data

    return (
        <div className={styles.Categories}>
            <h1 className={styles.CategoriesHeading}>Kategorie</h1>
            {isLoading &&
                <div className={styles.CategoriesLoading}>
                    Trwa ładowanie danych
                </div>
            }
            {isError && (
                <div className={styles.CategoriesError}>
                    Wystąpił błąd
                </div>
            )}
            {!isLoading && !isError && categories && (
                <>
                    {categories.length === 0 && (
                        <div className={styles.CategoriesError}>
                            Brak kategorii
                        </div>
                    )}
                    <ul className={styles.CategoriesList}>
                        {categories.map(category => (
                            <li key={category.id}><a href={"#"}>{category.name}</a></li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}