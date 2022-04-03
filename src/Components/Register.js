import React,{ useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import img from "./avatar3.jpg"
import {useNavigate} from "react-router-dom"

const Register = () =>{
    const navigate = useNavigate()
  const [imageDB, setImageDB] = useState("");
  const [avater,setAvater] = useState(img);

    const schemaModel = yup.object().shape({
        name: yup.string().required("This field has to be filled"),
        email: yup.string().email().required("This field has to be filled"),
        password: yup.string().required("This field has to be filled"),
        confirm: yup.string().oneOf([yup.ref("password"), null]),
    });

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schemaModel),
    });

    const File = (e) =>{
        const file = e.target.files[0];
        const save = URL.createObjectURL(file);
        setAvater(save);
        setImageDB(file)
    }

    const onSubmit = handleSubmit(async (data) => {

        
        const { name, email, password, imageDB } = data;
        console.log(data);

        const formData = new FormData();
    
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("avatar", imageDB);
    
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
    
        await axios.post("http://localhost:2044/api/register", formData, config);
    
        reset();
        navigate("/Login")
    });


    return(
        <Content>
            <Card  onSubmit={onSubmit} type="multipart/form-data">
                <Image src={avater}/>
                <Button htmlFor="pix">Upload</Button>
                <input type="file" id="pix" style={{display:"none"}}onChange={File}/>
                <Input placeholder="Name" {...register("name")}/>
                <div> {errors.name && errors.name.message}</div>
                <Input placeholder="Email" {...register("email")}/>
                <div> {errors.email && errors.email.message}</div>
                <Input placeholder="Password" {...register("password")}/>
                <div> {errors.password && errors.password.message}</div>
                <Input placeholder="confirm-Password" {...register("confirm")}/>
                <div> {errors.confirm && errors.confirm.message}</div>
                <Buttons2 type="submit">Register</Buttons2>
                <Span>Already have an account <Spans to="/Login">login</Spans></Span>
            </Card>
        </Content>
    )
}

export default Register;

const Spans = styled(Link)`
    color: red;
    text-decoration: none;
    :hover{
        cursor: pointer;
        text-decoration: underline;
    }
`

const Span = styled.span`
    margin-top: 10px;
    font-weight: bold;
`

const Button = styled.label`
    width:100px;
    height:50px;
    background-color:grey;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    font-size: 20px;
    border-radius:7px;
    font-weight:bold;
    margin-top:10px;
    :hover{
        cursor: pointer;
    }
`

const Buttons2 = styled.button`
    width:100px;
    height:50px;
    background-color:grey;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    font-size: 20px;
    border-radius:7px;
    font-weight:bold;
    margin-top:10px;
    border: 0;
    :hover{
        cursor: pointer;
    }
`

const Image = styled.img`
    object-fit: cover;
    width:150px;
    height: 150px;
    /* background-color:blue; */
    border-radius:100%;
`

const Input = styled.input`
    width:45vw;
    height:50px;
    border-radius: 5px;
    border: none;
    background-color:lightgray;
    outline: none;
    padding-left: 10px;
    margin-top: 10px;
`

const Card = styled.form`
    width:53vw;
    height: 75vh;
    background-color:white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
`

const Content = styled.div`
    width:100%;
    min-height:calc(100vh - 65px);
    background-color:lightgrey;
    display: flex;
    justify-content: center;
    align-items:center;
`