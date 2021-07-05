import {useHistory} from 'react-router-dom'
import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Form, Button, Container} from 'react-bootstrap'
import axios from 'axios'

function CreateTest() {
    const history = useHistory()
    const {register, handleSubmit} = useForm()
    const xlsx = require('xlsx')
    const token = localStorage.getItem('token')

    // init states
    // for create test button: create word || create sentence || update word || update sentence
    const [buttonState, setButtonState] = useState("create word");

    /**
     *
     * @param {*} data - contains parsed input fields and uses name attribute to create object fields
     */
    const onSubmit = (data) => {
        const reader = new FileReader()
        const level = data.level;
        const type = data.type;
        reader.onload = async (evt) => {
            const bstr = evt.target.result
            const wb = xlsx.read(bstr, {type: 'binary'})
            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]
            const data = xlsx.utils.sheet_to_json(ws, {header: 1})
            try {
                if (buttonState === "create word") {
                    await axios.post('questions', {data, level, type}, {
                        headers: {Authorization: `Bearer ${token}`},
                    })
                } else if (buttonState === "create sentence") {
                    await axios.post('sentence', {data, level, type}, {
                        headers: {Authorization: `Bearer ${token}`},
                    })
                } else if (buttonState === "update word") {
                    await axios.patch('questions', {data, level, type}, {
                        headers: {Authorization: `Bearer ${token}`},
                    })
                } else {
                    await axios.patch('sentence', {data, level, type}, {
                        headers: {Authorization: `Bearer ${token}`},
                    })
                }
                history.push('/')
            } catch (err) {
                history.push('/')
                console.log(err)
            }
        }
        reader.readAsBinaryString(data.exam[0])
        // const result = excelToJson({ sourceFile: data.exam[0] })
    }

    return (
        // <Form onSubmit={this.onSubmit}>
        <Container className="mt-4">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formFile" className="mb-3">
                    <select {...register('type', {required: true})}>
                        <option>Select Level</option>
                        <option value="word">Word Questions</option>
                        <option value="sentence">Sentence Questions</option>
                    </select>
                    <Form.Control type="text" {...register('level', {required: true})} placeholder="Enter Level"/>
                    <Form.Control
                        {...register('exam', {required: true})}
                        type="file"
                        size="lg"
                        // onChange={(e) => (this.level = e.target.value)}
                    />
                </Form.Group>
                <Button variant="success" type="submit" onClick={e => setButtonState("create word")}>
                    Create Word
                </Button>
                <Button variant="success" type="submit" onClick={e => setButtonState("create sentence")}>
                    Create Sentence
                </Button>
                <Button variant="success" type="submit" onClick={e => setButtonState("update word")}>
                    Update Word
                </Button>
                <Button variant="success" type="submit" onClick={e => setButtonState("update sentence")}>
                    Update Sentence
                </Button>
            </Form>
        </Container>
    )
}

export default CreateTest
