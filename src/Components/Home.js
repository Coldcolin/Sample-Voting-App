import React,{useState, useEffect} from 'react'
import styled from "styled-components"
// import img from "../img.jpg" 
import axios from "axios"


const Home = () => {
    const [data, setData] = useState([])
    const [vPres, setvPres] = useState([])
    const [treas, setTreas] = useState([])
    const [Publo, setPublo] = useState([])
    const [Welf, setWelf] = useState([])

    const fetchData = async()=>{
        const res = await axios.get("http://localhost:2044/api/president/candidate")
        console.log(res.data.data)
        setData(res.data.data)
    }
    const fetchVp = async()=>{
        const res = await axios.get("http://localhost:2044/api/vicePresident/candidate")
        
        setvPres(res.data.data)
    }
    const fetchTres = async()=>{
        const res = await axios.get("http://localhost:2044/api/treasurer/candidate")
        
        setTreas(res.data.data)
    }
    const fetchPub = async()=>{
        const res = await axios.get("http://localhost:2044/api/publicity/candidate")
        
        setPublo(res.data.data)
    }
    const fetchWelf = async()=>{
        const res = await axios.get("http://localhost:2044/api/welfare/candidate")
        
        setWelf(res.data.data)
    }

        useEffect(()=>{
            fetchData()
            fetchVp()
            fetchTres()
            fetchPub()
            fetchWelf()
        }, [])

  return (
    <Content>
        {
            data.map((props)=>(
            <Card key={props._id}>
                <Position>
                    {props.position}
                    <NumberOfVote>Votes:{props.Votes.length}</NumberOfVote>
                </Position>
                <Image src={`http://localhost:2044/${props.avatar}`}/>
                <Name>{props.name}</Name>
            </Card>
            ))
        }
        {
            vPres.map((props)=>(
            <Card key={props._id}>
                <Position>
                    {props.position}
                    <NumberOfVote>Votes:{props.Votes.length}</NumberOfVote>
                </Position>
                <Image src={`http://localhost:2044/${props.avatar}`}/>
                <Name>{props.name}</Name>
            </Card>
            ))
        }
        {
            treas.map((props)=>(
            <Card key={props._id}>
                <Position>
                    {props.position}
                    <NumberOfVote>Votes:{props.Votes.length}</NumberOfVote>
                </Position>
                <Image src={`http://localhost:2044/${props.avatar}`}/>
                <Name>{props.name}</Name>
            </Card>
            ))
        }
        {
            Publo.map((props)=>(
            <Card key={props._id}>
                <Position>
                    {props.position}
                    <NumberOfVote>Votes:{props.Votes.length}</NumberOfVote>
                </Position>
                <Image src={`http://localhost:2044/${props.avatar}`}/>
                <Name>{props.name}</Name>
            </Card>
            ))
        }
        {
            Welf.map((props)=>(
            <Card key={props._id}>
                <Position>
                    {props.position}
                    <NumberOfVote>Votes:{props.Votes.length}</NumberOfVote>
                </Position>
                <Image src={`http://localhost:2044/${props.avatar}`}/>
                <Name>{props.name}the Name</Name>
            </Card>
            ))
        }
    </Content>
  )
}

export default Home;

const NumberOfVote = styled.div``

const Name = styled.div`
    width: 95%;
    word-break: break-all;
    font-weight: bold;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Position = styled.div`
    width: 95%;
    height: 50px;
    word-break: break-all;
    font-weight: bold;
    padding: 3px;
    display: flex;
    justify-content: Space-between;
    align-items: center;
    justify-content:space-between;
`

const Image = styled.img`
    object-fit: cover;
    width:95%;
    height: 80%;
    border-radius: 5px;
`

const Card = styled.div`
    width:300px;
    height:330px;
    background-color:white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin: 10px;
`

const Content = styled.div`
    width:100%;
    min-height:calc(100vh - 65px);
    background-color: lightgray;
    display: flex;
    justify-content: center;
    flex-wrap:wrap;
`