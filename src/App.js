import './App.css';
import Navbar from "./components/NavBar.js"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


import React, { Component } from 'react'
import News from './components/News.js';

export default class App extends Component {
  
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize = {8} category = "general"/>}></Route>
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize = {8} category = "entertainment"/>}></Route>
            <Route exact path="/sports" element={<News key="sports" pageSize = {8} category = "sports"/>}></Route>
            <Route exact path="/science" element={<News key="science" pageSize = {8} category = "science"/>}></Route>
            <Route exact path="/health" element={<News key="health" pageSize = {8} category = "health"/>}></Route>
            <Route exact path="/technology" element={<News key="technology" pageSize = {8} category = "technology"/>}></Route>
            <Route exact path="/business" element={<News key="business" pageSize = {8} category = "business"/>}></Route>
          </Routes>

        </Router>
      </div>
    )
  }
}
