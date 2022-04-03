import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const VoteValidationVP = ({showModal, setShowModal}) => {
    const navigate = useNavigate()
    const castVote = async (id) => {
        // const url = "";     
    
        // await axios.post();
        navigate("/successpagevp")
      };


    return (
        <>
                 {showModal ? (
            <Background>
                <Container showModal={showModal} onSubmit={castVote}>
                    <CloseBtn aria-label="Close modal"
                    onClick={()=> setShowModal(open => !open)}>x</CloseBtn>
                    <Title>Are you sure you want to vote this candidate?</Title>
                    <Display/>
                    <Validate>
                        <Decline 
                        type="submit"
                        onClick={()=> setShowModal(open => !open)}
                        >DECLINE</Decline>
                        <Signup type="submit">VOTE</Signup>
                    </Validate>                    
                </Container>
            </Background>
        ) : null}
        </>
    )
}

export default VoteValidationVP


const Background = styled.div`
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 120;
    top: 0;
    left: 0;
`
const Container = styled.form`
    width: 600px;
    height: 400px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const CloseBtn= styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color:  rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: grey;
    :hover{
        color: black;
    }
`
const Title = styled.div`
    font-size: 23px;    
    margin: 15px 0;
    margin-left: 15px;
`

const Display = styled.img`
    width: 250px;
    height: 250px;
    border: 1px lightgrey solid;
`
const Validate= styled.div`
    display: flex;
    margin-top: 15px;

`
const Signup = styled.button`
   padding: 10px; 
   font-size: 18px;
   border: none;
   color: white;
   background-color: green;
   cursor: pointer; 
   margin-left: 5px; 
   border-radius: 5px;
`
const Decline = styled.button`
   padding: 10px;
   font-size: 18px;  
   border: none;
   color: white;
   background-color: red;
   cursor: pointer;
    margin-right: 5px;
    border-radius: 5px;
`