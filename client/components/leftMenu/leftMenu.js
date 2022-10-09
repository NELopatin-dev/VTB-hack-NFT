import styles from "./leftMenu.module.css";

import Link from "next/link";

import Image from 'next/image';
import logoVTB from "../../public/platforma/logoVTB.png"
import tasks from "../../public/platforma/tasks.png"
import rating from "../../public/platforma/rating.png"
import event from "../../public/platforma/event.png"
import birga from "../../public/platforma/birga.png"

export default function LeftMenu({}) {
    return (
        <>
            <div className={styles.bg}>
                <div className={styles.menuBtn}>
                    <Image src={logoVTB} className="menuBtn" />
                </div>

                <div className={styles.menu}>
                    <div className={styles.menuElem}>
                        <Link href={"/platform/"}>
                            <p className={styles.menuElemName}>Задачи</p>
                        </Link>

                        <div className={styles.menuElemIcon}>
                            <Image src={tasks} className="menuBtn" />
                        </div>
                    </div>

                    <div className={styles.menuElem}>
                        <Link href={"/platform/"}>
                            <p className={styles.menuElemName}>События</p>
                        </Link>

                        <div className={styles.menuElemIcon}>
                            <Image src={event} className="menuBtn" />
                        </div>
                    </div>

                    <div className={styles.menuElem}>
                        <Link href={"/platform/"}>
                            <p className={styles.menuElemName}>Рейтинг</p>
                        </Link>

                        <div className={styles.menuElemIcon}>
                            <Image src={rating} className="menuBtn" />
                        </div>
                    </div>

                    <div className={styles.menuElem}>
                        <Link href={"/platform/"}>
                            <p className={styles.menuElemName}>Биржа</p>
                        </Link>

                        <div className={styles.menuElemIcon}>
                            <Image src={birga} className="menuBtn" />
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
            svg {
                height: 30px;
                width: 30px;
                fill: white
            }
            svg.menuBtn {
                height: 40px;
                width: 40px;
            }
            `}
            </style>
        </>
    );
}
