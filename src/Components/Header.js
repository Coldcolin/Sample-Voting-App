import React,{ useState, useContext } from 'react';
import styled from "styled-components"
import { Link } from "react-router-dom"
import logo from "./Images/logo.png"
import { AuthContext } from "./Global/AuthProvider";
import {NavLink} from "react-router-dom"

const Header = () => {
  const { saveUser } = useContext(AuthContext);
  const [toggole, setToggle] = useState(false)

  const creatAccount = () =>{
    setToggle(!toggole)
  }

  return (
    <Content>
            <Logo to="/">
              <img src={logo} alt= ""/>
            </Logo>
        <Wrapper>
            <Navs>
              <Button to="/VoteP">Vote</Button>
            </Navs>
            <Nam>
              {saveUser?.isAdmin ? <Buttons to="/Add">Add Candidate</Buttons>: null}
              {
                toggole? (<Buttons1 to="/Register" onClick={creatAccount} >Register</Buttons1>)
                :(<Buttons1 to="/Login" onClick={creatAccount}>LogOut</Buttons1>)
              }
            </Nam>
        </Wrapper>
    </Content>
  )
}

export default Header;

const Button = styled(NavLink)`
  width:100px;
  height:40px;
  text-decoration: none;
  background-color:lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 17px;
  font-weight: bold;
  color: white;
  transform: scale(1);
  transition: all 890ms;
  :hover{
    transform: scale(1.1);
    cursor: pointer;
  }
`

const Buttons1 = styled(NavLink)`
  text-decoration:none;
  margin-left: 20px;
  margin-right: 5px;
  padding: 0px 10px 0px 10px;
  height:40px;
  background-color:lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 17px;
  font-weight: bold;
  color: white;
  transform: scale(1);
  transition: all 890ms;
  :hover{
    transform: scale(1.1);
    cursor: pointer;
  }
`

const Buttons = styled(NavLink)`
  margin-left: 20px;
  text-decoration: none;
  margin-right: 5px;
  padding: 0px 10px 0px 10px;
  height:40px;
  background-color:lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 17px;
  font-weight: bold;
  color: white;
  transform: scale(1);
  transition: all 890ms;
  :hover{
    transform: scale(1.1);
    cursor: pointer;
  }
`

const Nam = styled.div`
  height: 90%;
  display: flex;
  justify-content: center;
  justify-content: center;
  align-items: center;
`

const Navs = styled.div`
  width: 25%;
  height: 90%;
  display: flex;
  align-items: center;
`

const Logo = styled(NavLink)`
  text-decoration: none;
  width:100px;
  height:50px;
  margin-left: 20px;
  margin-right: 10px;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  object-fit: cover;
  img{
    width:100%;
    height:100%;
  }
`

const Wrapper = styled.div`
  margin-right: 20px;
  width:85%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content:space-between;
`

const Content = styled.div`
    width:100%;
    height:65px;
    background-color:white;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-content:space-between;
`