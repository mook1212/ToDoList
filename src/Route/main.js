import { createContext, useState } from "react"
import { Route, Routes, Link, useNavigate, Outlet, Navigate } from 'react-router-dom'
import style from './main.module.css'
import classNames from 'classnames/bind'

const cs = classNames.bind(style);

function Main() {
    let navigate = useNavigate();

    let token = localStorage.getItem('token')

    return (
        <div className={cs("back")}>
            <div className={cs("main")}>
                <h1>나만의 일정 My Diary</h1>
                <div className={cs("main-img")}>
                    <img src={process.env.PUBLIC_URL + `/img/book0.png`}/>
                </div>
                <button onClick={ ()=> {
                    if(token != null) {
                        navigate('/todo')
                    } else {
                        navigate('/login')
                    }
                }}>기록하기</button>

                {/* <button onClick={ ()=> {
                    navigate('/login')
                }}>로그인</button> */}

            </div>

        </div>
    )
}

export default Main