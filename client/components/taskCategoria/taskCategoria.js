import styles from "./taskCategoria.module.sass";
import Task from "../Task/task";

export default function TaskCategoria({title, tasks}) {
    return (
        <>
            <div className={styles.categoria}>
              <p className={styles.title}>
                {title}
              </p>
              <div className={styles.tasks}>

                {
                    tasks ?
                    tasks.map(task => (
                        <Task 
                            title={task.title}
                            deadline={task.deadline}
                            hardlevel={task.hardlevel} 
                        />
                    )) : null
                }

              </div>
            </div>
        </>
    );
}
