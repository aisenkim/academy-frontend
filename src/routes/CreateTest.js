import { useHistory } from 'react-router-dom'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'

function CreateTest() {
  const hitory = useHistory()
  const { register, handleSubmit } = useForm()
  const xlsx = require('xlsx')
  const token = localStorage.getItem('token')
  // init states

  /**
   *
   * @param {*} data - contains parsed input fields and uses name attribute to create object fields
   */

  const onSubmit = (data) => {
    const reader = new FileReader()
    reader.onload = async (evt) => {
      const bstr = evt.target.result
      const wb = xlsx.read(bstr, { type: 'binary' })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const data = xlsx.utils.sheet_to_json(ws, { header: 1 })
      console.log(data)
      // console.log(convertToJson(data))
      await axios.post('testing', data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    }
    reader.readAsBinaryString(data.exam[0])
    // const result = excelToJson({ sourceFile: data.exam[0] })
  }

  return (
    // <Form onSubmit={this.onSubmit}>
    <Container className="mt-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            {...register('exam', { required: true })}
            type="file"
            size="lg"
            // onChange={(e) => (this.level = e.target.value)}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  )
}

export default CreateTest
