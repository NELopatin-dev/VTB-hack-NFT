import { useEffect, useState } from 'react';
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

import styles from '../styles/Home.module.sass';
import logo from '../public/logo.png'
import f1 from '../public/1s.png'
import f2 from '../public/2s.png'
import f3 from '../public/3s.png'
import m1 from '../public/m1.png'
import m2 from '../public/m2.png'
import m3 from '../public/m3.png'
import Image from 'next/image';
import Head from 'next/head';


function Home() {
  const [popup, setPopup] = useState(false)

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [userToken, setUserToken] = useState('')
  const [errMess, setErrMess] = useState('')

  const router = useRouter();

  const getUserToken = async () => {
    const response = await fetch(`/api/user/logIn`, {
        method: "POST",
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    });
    const data = await response.json();
  
    if (data.message) {
        setErrMess(data.message);
    } else {
        setUserToken(data.token);
        setErrMess("");
  
        cookieCutter.set("userToken", data.token);
        router.push("/platform");
    }
  };

  const usCheck = async() => {
    const response = await fetch(`/api/user/check`, {
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



  useEffect(() => {
    if (cookieCutter.get("userToken")) {
      usCheck().then((data) => {
        console.log(data);
        if (data.auth === true) {
            setUserToken(cookieCutter.get("userToken"))
        } else {
            cookieCutter.set("userToken", "0", { expires: new Date(0) });
        }
      })      
    } else {
      console.log('Cookie is not set');
    }
  }, []);
  
  
  return (
    <>
      <Head>
        <title>Вселенная возможностей</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={styles.main}>
        <div className={styles.block+' '+styles.fullscreen}>
          <div className={styles.bg}></div>
          <div className={styles.leftSide}>
            <h1 className={styles.title}>Вселенная возможностей</h1>
            <h2 className={styles.subtitle}>Осваивайте новую реальность вместе.<br/>Бесконечность - не предел.</h2>

            <div className={styles.btn_container}>
              {
                userToken ?? userToken !== '' ? (
                  <a href={'/platform'}>Войти</a>
                ) : (
                  <button onClick={popupToggel}>Войти</button>
                )
              }
              <a href="#more">Подробнее</a>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.image_container}>
              <Image className={styles.imageFull} src={logo} />
            </div>
          </div>
        </div>

        
        <div className={styles.block}>
          <div className={styles.bg}>
            <a name="more"></a>
          </div>
          <div className={styles.card}>
            <div className={styles.leftSide}>
              <p className={styles.title}>Ты  меняешь реальность!</p>
              <p className={styles.description}>Используй свои достижения в работе, получай больше токенов, соревнуйся с коллегами, стремись к лучшему!</p>
            </div>
            <div className={styles.rightSide}>
              <div className={styles.image_container}>
                <Image className={styles.imageFull} src={f1} />
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.leftSide}>
            <div className={styles.image_container}>
                <Image className={styles.imageFull} src={f2} />
              </div>
            </div>
            <div className={styles.rightSide}>
            <p className={styles.title}>Бортовой компьютер!</p>
              <p className={styles.description}>Ты всегда знаешь как тебе стать еще лучше! Уже поставленные задачи тебя ждут и помогают расти!</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.leftSide}>
              <p className={styles.title}>Команда - наш экипаж!</p>
              <p className={styles.description}>Решайте задачи вовремя, заполняйте общий прогресс в течении сезона и получайте награды!</p>
            </div>
            <div className={styles.rightSide}>
              <div className={styles.image_container}>
                <Image className={styles.imageFull} src={f3} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.block+' '+styles.fullscreen}>
          <div className={styles.bg}></div>
          <div className={styles.verticalCard}>
            <Image className={styles.icon} src={m1}/>
            <p className={styles.title}>Digital rubel</p>
            <p className={styles.description}>Получай Цифровые рубли за проделанную работу и покупай интересные вещи или вкладывайся в саморазвитие!</p>
          </div>
          <div className={styles.verticalCard}>
            <Image className={styles.icon} src={m2}/>
            <p className={styles.title}>Космо-биржа “Меркурий” </p>
            <p className={styles.description}>Продуманная площадка  для покупки, обмена и продажи NFT, обменивайся с коллегами своими карточками, получай то что хочешь</p>
          </div>
          <div className={styles.verticalCard}>
            <Image className={styles.icon} src={m3}/>
            <p className={styles.title}>Верстак уникальных предметов</p>
            <p className={styles.description}>создавай более сложные NFT с помощью крафта, получай уникальные предметы с ограниченным тиражом и возможностями</p>
          </div>
        </div>
      </div>

      <div className={popup ? styles.bg_popup+" "+styles.active : styles.bg_popup}>
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
      </div>
    </>
  )
}


export default Home;