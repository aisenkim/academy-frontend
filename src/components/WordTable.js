import {Container, Table} from "react-bootstrap";
import React from "react";
import {useHistory} from "react-router-dom";

function WordTable(props) {
    const history = useHistory();
    return (
       <Container className="mt-4" fluid>
           <Table striped bordered hover>
               <thead>
               <tr>
                   <th>#</th>
                   <th>Word</th>
                   <th>Meaning</th>
               </tr>
               </thead>
               <tbody>
               {props.wordList.map((word, idx) => {
                   return !word ? null : (
                       <tr key={idx}>
                           <td>{idx + 1}</td>
                           <td>{word.question}</td>
                           <td>{word.answer}</td>
                       </tr>
                   )
               })}
               </tbody>
           </Table>
       </Container>
    )
}

export default WordTable