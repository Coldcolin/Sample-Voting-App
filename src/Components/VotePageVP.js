import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import VoteValidationVP from './VoteValidationVP'
import { Link } from 'react-router-dom'
import axios from 'axios'

const VotePageVP = () => {

    const [showModal, setShowModal] = useState(false)

    const openModal = ()=> {
        setShowModal(open=> !open)
    }


    const [vPresident, setVPresident] = useState([]);
    const getVPresident = async () => {
        const url = "http://localhost:2044/api/vicePresident/candidate";
        const res = await axios.get(url);
        if (res) {
          setVPresident(res.data.data);
        }
      };

    
    useEffect(()=> {
        getVPresident()
    })
    return (
        <>
            <Container>
                <Wrapper>
                    <Skip to="/votepagewel">Skip</Skip>
                    <Title>Vote your choice Candidate For V/President</Title>
                    <Holder>
                    {
                        vPresident?.map((props)=>(
                                <Card>
                            <Image src={`http://localhost:2044/${props.avatar}`}/>
                            <Name>{props.name}</Name>
                            <VoteValidationVP showModal={showModal} setShowModal={setShowModal}/>
                            <Vote onClick={openModal}>Vote</Vote>
                        </Card>
                            ))
                        }
                    </Holder>                    
                </Wrapper>
            </Container>
        </>
    )
}

export default VotePageVP


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
    height: 300px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.4);


`
const Image = styled.img`
    width: 230px;
    height: 250px; 
    border: none;
    border-radius: 4px;
    background-color: whitesmoke;
`
const Vote = styled.button`
    width: 230px;
    height: 40px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.4);
    border: none;
    border-radius: 4px;
    margin-top: 5px;
    background-color: #505050;
    color: white;
    font-weight: 700;
    font-size: 16px;
`
const Name = styled.div`
    width: 95%;
    word-break: break-all;
    font-weight: bold;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
`