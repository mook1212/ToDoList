import './App.css';
import { createContext, useState } from "react"
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'
import Main from './Route/main.js'
import Todo from './Route/todo.js'
import Login from './Route/login.js'


function App() {

  
  return (
    <div>

      <Routes>
        <Route path='/' element={<Main></Main>} />

        <Route path='/todo' element={<Todo></Todo>} />
        <Route path='/login' element={<Login></Login>} />

      </Routes>

    </div>

  );
}

export default App;
