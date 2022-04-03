import React from 'react'
import styled from 'styled-components'
import {NavLink} from "react-router-dom"
const SuccessPage = () => {
    return (
        <>
            <Container>
                <Wrapper>
                    <Title>You have successfully voted: </Title>
                    <Display/>
                    <Name>Colin Buski</Name>
                    <div>as President</div>
                    <Holder>
                        {/* <Exit>Exit</Exit> */}
                        <Next to="/VotePub">Next</Next>
                    </Holder>                  
                </Wrapper>
            </Container>
        </>
    )
}

export default SuccessPage


const Container = styled.div`
     width: 100%;
    height: 100vh;
    background-color: #303030;  
`
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
`
const Title = styled.div`
    font-weight: 700;
    font-size: 36px;
    color: green;
    margin-top: 80px;
`
const Display = styled.img`
    width: 250px;
    height: 250px;
    border: 1px lightgrey solid;
    margin-top: 20px;
`
const Name = styled.div`
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
    margin-top: 10px;
    
`
const Holder = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const Exit = styled.button`
    padding: 10px;
   font-size: 18px;  
   border: none;
   color: white;
   background-color: red;
   cursor: pointer;
    margin-right: 5px;
    border-radius: 5px;
`
const Next = styled(NavLink)`
    padding: 10px; 
   font-size: 18px;
   text-decoration: none;
   border: none;
   color: white;
   background-color: green;
   cursor: pointer; 
   margin-left: 5px; 
   border-radius: 5px;
`