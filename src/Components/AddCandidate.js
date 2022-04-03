import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {AuthContext } from "./Global/AuthProvider";
import img from './avatar3.jpg'


const AddCandidate = () => {
    const { saveUser} = useContext(AuthContext);
    const navigate = useNavigate()
    const [image, setImage] = useState(img)
    const [avatar, setAvatar] = useState("")
    const [position, setPosition] = useState("President")

    const uploadImage = (e)=> {
        const file = e.target.files[0]
        const save = URL.createObjectURL(file)
        setAvatar(file)
        setImage(save)
    }

    const schema = yup.object().shape({
        name: yup.string().required("Please fill this field")
    })

    const {
        reset,
        handleSubmit,
        formState: {errors},
        register
    } = useForm({ resolver: yupResolver(schema)})

    const registerPresident = handleSubmit(async (data)=> {
        const url = 'http://localhost:2044/api/president/candidate/create'
        console.log(data)
        const {name} = data

        const formData = new FormData()
        formData.append("name", name)
        formData.append("avatar", avatar)

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                authorization: `voting ${saveUser?.token}`
            }
        }
        await axios.post(url, formData, config)

        navigate("/")
    })
    const registerVicePresident = handleSubmit(async (data)=> {
        const url = 'http://localhost:2044/api/vicePresident/candidate/create'
        console.log(data)
        const {name} = data

        const formData = new FormData()
        formData.append("name", name)
        formData.append("avatar", avatar)

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                authorization: `voting ${saveUser?.token}`
            }
        }
        await axios.post(url, formData, config)

        navigate("/")
    })
    const registerPublicity = handleSubmit(async (data)=> {
        const url = 'http://localhost:2044/api/publicity/candidate/create'
        console.log(data)
        const {name} = data

        const formData = new FormData()
        formData.append("name", name)
        formData.append("avatar", avatar)

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                authorization: `voting ${saveUser?.token}`
            }
        }
        await axios.post(url, formData, config)

        navigate("/")
    })
    const registerWelfare = handleSubmit(async (data)=> {
        const url = 'http://localhost:2044/api/welfare/candidate/create'
        console.log(data)
        const {name} = data

        const formData = new FormData()
        formData.append("name", name)
        formData.append("avatar", avatar)

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                authorization: `voting ${saveUser?.token}`
            }
        }
        await axios.post(url, formData, config)

        navigate("/")
    })
    const registerTreasurer = handleSubmit(async (data)=> {
        const url = 'http://localhost:2044/api/treasurer/candidate/create'
        console.log(data)
        const {name} = data

        const formData = new FormData()
        formData.append("name", name)
        formData.append("avatar", avatar)

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                authorization: `voting ${saveUser?.token}`
            }
        }
        await axios.post(url, formData, config)

        navigate("/")
    })


    return (
        <>
            <Container>
                <Wrapper>
                    <Card>
                        <Image src={image}/>
                        
                            <ImageLabel htmlFor="pics">Upload Candidate image</ImageLabel>
                            <ImageInput id="pics" type="file" onChange={uploadImage}/>
                        
                        <Select
                            value={position}
                            onChange={(e) => {
                                setPosition(e.target.value);
                            }}
                            >
                            
                            <Option value="Select Position">Select Position</Option>
                            <Option value="President">President</Option>
                            <Option value="VP/Secretary">VP/Secretary</Option>
                            <Option value="Fin Sec/Welfare">Fin Sec/Welfare</Option>
                            <Option value="Program Coordinator/Publicity">
                                Program Coordinator/Publicity
                            </Option>
                            <Option 
                            value="Treasurer/Chief Whip">
                                Treasurer/Chief Whip
                            </Option>
                        </Select>
                        {position === "President" ? (
                            <LabelForm
                            onSubmit={registerPresident}
                            type="multipart/form-data"
                        >
                            <Input placeholder="Enter your Name" 
                            {...register("name")} 
                            />
                            <Label>                            
                            {errors.password && <p>Please enter your Name.</p>}
                            </Label>

                            <Button type="submit">Creating {position}</Button>
                        </LabelForm>
                        ) : position === "VP/Secretary" ? (
                            <LabelForm
                            onSubmit={registerVicePresident}
                            type="multipart/form-data"
                        >
                            <Input placeholder="Enter your Name" 
                            {...register("name")} 
                            />
                            <Label>                            
                            {errors.password && <p>Please enter your Name.</p>}
                            </Label>

                            <Button type="submit">Creating {position}</Button>
                        </LabelForm>
                        ) : position === "Fin Sec/Welfare" ? (
                            <LabelForm
                            onSubmit={registerWelfare}
                            type="multipart/form-data"
                        >
                            <Input placeholder="Enter your Name" 
                            {...register("name")} 
                            />
                            <Label>                            
                            {errors.password && <p>Please enter your Name.</p>}
                            </Label>

                            <Button type="submit">Creating {position}</Button>
                        </LabelForm>
                        ) : position === "Program Coordinator/Publicity" ? (
                            <LabelForm
                            onSubmit={registerPublicity}
                            type="multipart/form-data"
                        >
                            <Input placeholder="Enter your Name" 
                            {...register("name")} 
                            />
                            <Label>                            
                            {errors.password && <p>Please enter your Name.</p>}
                            </Label>

                            <Button type="submit">Creating {position}</Button>
                        </LabelForm>
                        ) : position === ""   ? (
                            <LabelForm
                            onSubmit={registerTreasurer}
                            type="multipart/form-data"
                        >
                            <Input placeholder="Enter your Name" 
                            {...register("name")} 
                            />
                            <Label>                            
                            {errors.password && <p>Please enter your Name.</p>}
                            </Label>

                            <Button type="submit">Creating {position}</Button>
                        </LabelForm>
                        ): null}
                    </Card>
                </Wrapper>
            </Container>
        </>
    )
}

export default AddCandidate



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
    justify-content: center;
`
const Card = styled.div`
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.4);
    background-color: whitesmoke;

`
const Image = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #999999;
    border: 2px solid;
    margin-top: 20px;

`
const ImageLabel = styled.label`
    margin-top: 10px;
    padding: 8px;
    background-color: #999999;
    color: white;
    border-radius: 4px;
`
const ImageInput = styled.input`
    display: none;
`
const Select = styled.select`
    width: 270px;
    height: 35px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.4);
    border: none;
    border-radius: 4px;
    margin-top: 20px;
`
const Option = styled.option``
const LabelForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 270px;
`
const Label = styled.label`
    
`
const Input = styled.input`
    width: 265px;
    height: 35px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.4);
    border: none;
    border-radius: 4px;
    margin-top: 10px;
`
const Button = styled.button`
    width: 270px;
    height: 35px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.4);
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    background-color: #303030;
    color: white;
`