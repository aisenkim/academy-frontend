import {useHistory} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import React from "react";
import {useForm} from "react-hook-form";
import levels from "../files/levels.json";
import axios from "axios";

export default function CreateUser() {
    // get history
    const history = useHistory();

    // react-hook-form setup
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    // init all states

    const onSubmit = async (data) => {

        try {
            const token = localStorage.getItem('token')
            await axios.post('auth/signUp', data, {
                headers: {Authorization: `Bearer ${token}`},
            })
            history.push("/");
        } catch (error) {
            alert("Create User Failed");
        }
    }

    return (
        <Container className="mt-4">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="username" {...register("username", {required: true})} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="password" {...register("password", {required: true})} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="name" {...register("name", {required: true})} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Level</Form.Label>
                    <Form.Control as="select" {...register("level")}>
                        {levels.levels.map((item, idx) => {
                            return <option key={idx}>{item}</option>
                        })}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );

}