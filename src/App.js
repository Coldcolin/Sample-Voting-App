import React from 'react';
// import styled from 'styled-components'
import Header from "./Components/Header"
import Register from "./Components/Register"
import Login from "./Components/Login"
import Home from "./Components/Home"
import AddCan from "./Components/AddCandidate"
import VotePres from "./Components/VotePage"
import VotePub from "./Components/VotePagePub"
import VoteVp from "./Components/VotePageVP"
import VoteTres from "./Components/VotePageTrea"
import VoteWel from "./Components/VotePageWel"
import Success1 from "./Components/SuccessPage"
import Success2 from "./Components/SuccessPagePub"
import Success3 from "./Components/SuccessPageTrea"
import Success4 from "./Components/SuccessPageVP"
import Success5 from "./Components/SuccessPageWel"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import PresValidate from './Components/PresValidate';


function App() {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/pres/:id" element={PresValidate}/>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Add" element={<AddCan/>}/>
        <Route path="/VoteP" element={<VotePres/>}/>
        <Route path="/VotePub" element={<VotePub/>}/>
        <Route path="/VoteTrea" element={<VoteTres/>}/>
        <Route path="/VoteVp" element={<VoteVp/>}/>
        <Route path="/VoteWel" element={<VoteWel/>}/>
        <Route path="/successpage" element={<Success1/>}/>
        <Route path="/successpagepub" element={<Success2/>}/>
        <Route path="/successpagetrea" element={<Success3/>}/>
        <Route path="/successpagevp" element={<Success4/>}/>
        <Route path="/successpagewel" element={<Success5/>}/>
      </Routes>
    </Router>
  );
}

export default App;

