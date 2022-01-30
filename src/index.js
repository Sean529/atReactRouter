import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "./react-router-dom"
import { Home, User, Profile, Post } from "./components"

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home name="at" />} />
      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/post/:id" element={<Post />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
)
