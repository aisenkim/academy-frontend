import axios from 'axios'
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Button, Container, Form, Image} from "react-bootstrap";
import {useForm} from "react-hook-form";

function Login(props) {
    const history = useHistory()

    const {register, handleSubmit} = useForm();
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (data) => {

        try {
            const accessToken = await axios.post('auth/signin', data)
            localStorage.setItem('token', accessToken.data.accessToken)
            localStorage.setItem('name', accessToken.data.name)
            localStorage.setItem('roles', accessToken.data.roles)
            localStorage.setItem('level', accessToken.data.level)
            // to change navbar from login -> username (handled in App.js)
            props.setAppUser(accessToken.data.name)
            history.push('/')
        } catch (error) {
            // failed login
            setErrorMessage('Login failed. Please check your id or password')
        }
    }

    return (
        <Container className="d-flex justify-content-center vh-100 align-items-center">
            <Form onSubmit={handleSubmit(onSubmit)} >
                <Form.Group className="d-flex justify-content-center mb-3 row g-2">
                    <Image src="/academy-frontend/eie_logo.png"/>
                </Form.Group>
                <Form.Group className="mb-2 row g-2" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" {...register('username', {required: true})} placeholder="username" size="lg"/>
                </Form.Group >
                <Form.Group className="mb-3 row g-2">
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" {...register('password', {required: true})} placeholder="password" size="lg"/>
                </Form.Group>
                <Form.Group className="d-flex justify-content-center mb-3 row g-2">
                    <Button variant="success" type="submit" size="lg">Login</Button>
                </Form.Group>
            </Form>
            <div style={{fontSize: 20, color: 'red'}}>{errorMessage}</div>
        </Container>
    )
}

export default Login
