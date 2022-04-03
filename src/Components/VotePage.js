import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import VoteValidation from './VoteValidation'
import { Link, useNavigate } from 'react-router-dom'
// import * as yup from 'yup'
// import {yupResolver} from "@hookform/resolvers/yup"
import axios from 'axios'
// import { useForm } from 'react-hook-form'
import {AuthContext } from "./Global/AuthProvider";

const VotePage = () => {

    const navigate = useNavigate()
    const [president, setPresident] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [userID, setUserID] = useState("")
    const { saveUser} = useContext(AuthContext);

    


    const getPresident = async () => {
        const url = "http://localhost:2044/api/president/candidate";
        const res = await axios.get(url);

        if (res) {
          setPresident(res.data.data);
        }
        
    };

        // const catchId = async (id)=>{
        //     const url = "http://localhost:2044/api/president/seeID";
        //     const see = await axios.get(`${url}/${id}`)
        //     // console.log(see.data.data)
        //     setUserID(see.data.data)
        //     console.log(userID)
        // }

        // const openModal = ()=> {
        //     setShowModal(open=> !open)
        // }
    
    useEffect(()=> {
        getPresident()
    },[])
    return (
        <>
            <Container>
                <Wrapper> 
                    <Skip to="/VoteVp">Skip </Skip>
                    <Title>Vote your choice Candidate For President</Title>
                    <Holder>
                        {
                            president?.map((props)=>(
                                <Card key={props._id}>
                                    <Image src={`http://localhost:2044/${props.avatar}`}  onClick={()=>{
                                        console.log("Hello Data")
                                    }}/>
                                    <Name>{props.name} </Name>
                                    <Vote 
                                    to={`/Pres/${props._id}`} 
                                    
                                    onClick={()=>{
                                        console.log(props._id)
                                    }}
                                    >Vote</Vote>
                                </Card>
                            ))
                        }
                    </Holder>                    
                </Wrapper>
            </Container>
        </>
    )
}

export default VotePage


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
    position: relative;
`
const Skip = styled(Link)`
    position: absolute;
    top: 20px;
    right: 20px;
    font-weight: 600;
    font-size: 16px;
    color: white;
`
const Title = styled.div`
    font-weight: 700;
    font-size: 36px;
    color: white;
    margin-top: 80px;
`
const Holder = styled.div`
    width: 90%;
    margin-top: 30px;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
`
const Card = styled.div`
    margin: 10px;
    width: 230px;
    min-height: 300px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.4);
`
const Image = styled.img`
    width: 230px;
    height: 250px; 
    border: none;
    border-radius: 4px;
    background-color: whitesmoke;
    object-fit: cover;
`
const Vote = styled(Link)`
    text-decoration: none;
    /* width: 100px; */
    height: 40px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.4);
    border: none;
    border-radius: 4px;
    margin-top: 5px;
    background-color: #505050;
    color: white;
    font-weight: 700;
    font-size: 16px;
    padding-left: 95px;
    padding-right: 100px;
    padding-top: 10px;
    padding-bottom: 10px;
`
const Name = styled.div`
    width: 95%;
    height: 50px;
    word-break: break-all;
    font-weight: bold;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`