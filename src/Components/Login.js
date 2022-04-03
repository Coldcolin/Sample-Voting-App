import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const Login = () =>{
    const navigate = useNavigate()
    const schemaModel = yup.object().shape({
        email: yup.string().email().required("This field has to be filled"),
        password: yup.string().required("This field has to be filled"),
    });

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schemaModel),
    });

    const onSubmit = handleSubmit(async (data) => {
        // console.log(data);
        const { email, password } = data;
    
        const res = await axios.post("http://localhost:2044/api/LogIn",{
          email,
          password,
        });
    
        localStorage.setItem("Voter", JSON.stringify(res.data.data));
        reset();
        navigate("/")
    });

    return(
        <Content>
            <Card onSubmit={onSubmit}>
                <Input placeholder="Email" {...register("email")}/>
                <div> {errors.email && errors.email.message}</div>
                <Input placeholder="Password" {...register("password")}/>
                <div> {errors.password && errors.password.message}</div>
                <Button type="submit">Login</Button>
                <Span>don't have an account <Spans to ="/Register">register</Spans></Span>
            </Card>
        </Content>
    )
}

export default Login;

const Spans = styled(Link)`
    text-decoration: none;
    color: red;
    :hover{
        cursor: pointer;
        text-decoration: underline;
    }
`

const Span = styled.span`
    margin-top: 10px;
    font-weight: bold;
`

const Button = styled.button`
    border: none;
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
    width:50vw;
    height: 55vh;
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