import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route, Link } from "./react-router-dom"
import { Home, User, Profile, Post } from "./components"

ReactDOM.render(
  <BrowserRouter>
    <ul>
      <li>
        <Link to="/">首页</Link>
      </li>
      <li>
        <Link to="/user">用户管理</Link>
      </li>
      <li>
        <Link to="/profile">个人中心</Link>
      </li>
    </ul>
    <Routes>
      <Route path="/" element={<Home name="at" />} />
      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/post/:id" element={<Post />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
)
