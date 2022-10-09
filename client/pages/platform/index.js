import { useEffect, useState } from 'react';
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

import styles from '../../styles/Kanban.module.sass';
import Image from 'next/image';
import Head from 'next/head';
import LeftMenu from '../../components/leftMenu/leftMenu';
import TaskCategoria from '../../components/taskCategoria/taskCategoria';
import { TaskSettings } from '@carbon/icons-react';


function Home() {
  const [popup, setPopup] = useState(false)
  const [userToken, setUserToken] = useState('')
  const [tasks, setTasks] = useState()

  const router = useRouter();

  const usCheck = async() => {
    const response = await fetch(`/api/user/check`, {
        method: "POST",
        body: JSON.stringify({
            token: cookieCutter.get("userToken"),
        }),
      });
      return await response.json();
  }

  const getTasks = async() => {
    const response = await fetch(`/api/system/getTasks`, {
        method: "POST",
        body: JSON.stringify({
            token: cookieCutter.get("userToken"),
        }),
      });
      return await response.json();
  }

  const popupToggel = () => {
    if (popup) 
      setPopup(false);
    else 
      setPopup(true);
  }



  useEffect( () => {
    if (cookieCutter.get("userToken")) {
      usCheck().then((data) => {
        if (data.auth === true) {
          setUserToken(cookieCutter.get("userToken"));
          
          console.log('Worked')
          getTasks().then((tasks) => {
            setTasks(tasks);
          })

        } else {
          cookieCutter.set("userToken", "0", { expires: new Date(0) });
          setUserToken('');
          router.push("/");
        }
      })
    } else {
        router.push("/");
    }
  }, []);
  
  
  return (
    <>
      <Head>
        <title>Вселенная возможностей</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={styles.main}>
        <LeftMenu />

        <div className={styles.content}>
          <div className={styles.navbar}>

          </div>
          
          <div className={styles.kanbanContainer}>
            {
              tasks ? 
                Object.keys(tasks).map(categoria => (
                  <TaskCategoria
                    title={categoria}
                    tasks={tasks[categoria]}
                  />
                ))
             : null
            }
          </div>

        </div>
      </div>

      {/* <div className={popup ? styles.bg_popup+" "+styles.active : styles.bg_popup}>
        <div className={styles.popupToggel} onClick={popupToggel}></div>

        <div className={styles.popup}>
          <p className={styles.title}>
            Авторизация
          </p>

          <div className={styles.formContainer}>
            {
              errMess && errMess !== '' ? (
                <p className={styles.errMess}>{errMess}</p>
              ) : null
            }
            <input 
              className={styles.input} 
              placeholder='Логин' 
              type={'text'}
              onChange={(e) => setLogin(e.target.value)}
            ></input>
            <input 
              className={styles.input} 
              placeholder='*******' 
              type={'password'}
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <button className={styles.button} onClick={getUserToken}>Войти</button>
          </div>
        </div>
      </div> */}
    </>
  )
}


export default Home;