import {useParams} from "react-router";
import {useUser} from "../../hooks/useUser.ts";
import styles from './User.module.scss'

export default function User() {
    const id: number = parseInt(useParams().id as string)

    const {data, isLoading, isError} = useUser(id);

    const maps_link: string = `https://www.google.com/maps/place/${data?.user?.address.geo.lat}+${data?.user?.address.geo.lng}`
    const mottos: Array<string> = data?.user?.company.catchPhrase.split(" ") ?? [];

    return (
        <>
            {isLoading && (
                <div className={styles.UserLoading}>Trwa ładowanie danych</div>
            )}
            {isError && (
                <div className={styles.UserError}>Wystąpił błąd</div>
            )}
            {!isLoading && !isError && data !== null && data !== undefined && (
                <>
                    <article className={styles.UserArticle}>
                        <h1 className={styles.UserUsername}>{data.user.username}</h1>
                        <h2 className={styles.UserName}>{data.user.name}</h2>
                        <div className={styles.UserWebsite}>Check out my <a href={"http://"+data.user.website} className={styles.Link} target={"_blank"}>website</a></div>
                    </article>

                    <article className={styles.UserArticle}>

                    <section className={styles.UserArticleSection}>
                        <h2 className={styles.UserArticleSectionTitle}>Contact with me</h2>
                        <p className={styles.UserArticleSectionItem}>Email: {data.user.email}</p>
                        <p className={styles.UserArticleSectionItem}>Phone: {data.user.phone}</p>
                    </section>

                    <section className={styles.UserArticleSection}>
                        <h2 className={styles.UserArticleSectionTitle}>I live at</h2>
                        <p className={styles.UserArticleSectionItem}>City: {data.user.address.city}</p>
                        <p className={styles.UserArticleSectionItem}>Street: {data.user.address.street}</p>
                        <p className={styles.UserArticleSectionItem}>Suite: {data.user.address.suite}</p>
                        <p className={styles.UserArticleSectionItem}>Zipcode: {data.user.address.zipcode}</p>
                        <p className={styles.UserArticleSectionItem}><a href={maps_link} className={styles.Link} target={"_blank"}>Visit me!</a></p>
                    </section>

                    <section className={styles.UserArticleSection}>
                        <h2 className={styles.UserArticleSectionTitle}>My company</h2>
                        <p className={styles.UserArticleSectionItem}>I work at {data.user.company.name} company!</p>
                        <ul className={styles.UserArticleSectionList}>Our mottos are:
                            {mottos.map((motto: string) => <li className={styles.UserArticleSectionListItem}>{motto}</li>)}
                        </ul>
                    </section>

                    </article>

                </>
            )}
        </>
    )
}