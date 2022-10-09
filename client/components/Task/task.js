import styles from "./task.module.sass";

export default function Task({title, deadline, hardlevel}) {
    return (
        <>
            <div className={styles.task}>
                <p className={styles.title}>{title}
                </p>
                <div className={styles.description}>
                <p className={styles.deadline}>
                    {deadline}
                </p>
                <p className={styles.hardlevel}>
                    {hardlevel}
                </p>
                </div>
            </div>
        </>
    );
}
