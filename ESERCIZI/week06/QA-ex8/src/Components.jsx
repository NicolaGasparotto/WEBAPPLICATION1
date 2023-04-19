import { useState } from "react";
import { Badge, Button, Col, Form, Row, Table } from "react-bootstrap";

function QuestionWithAnswers(props) {

    const q = props.question;
    const answers = props.answers ;

    if (q) {
        return (<>
            <QuestionDetails author={q.author} text={q.text} />
            <AnswerDetails answers={answers} deleteAnswer={props.deleteAnswer} upVoteAnswer={props.upVoteAnswer} />
        </>)

    } else {
        return <div>"QUESTION UNDEFINED"</div>
    }

}

function QuestionDetails(props) {
    return <div>
        <Row>
            <Col md={8}>
                <p className='lead'>{props.text}</p>
            </Col>
            <Col md={4} className='text-end'>
                Asked by <Badge pill bg='secondary'>{props.author}</Badge>
            </Col>
        </Row>

    </div>
}

function AnswerDetails(props) {
    // 2 possible solution to obtain sorting on the array passed from global variables:
    
    // real solution:
    const [sorted, setSorted] = useState('none');

    // LOCAL COMPUTATION -->  more expensive because every time the function is called the array is resorted and recomputed
    // but if the sorting is put inside a function it doesn't happen every time so is generally a better idea
    let sortedAnswers = [...props.answers];
    let sortIcon = '-';

    if(sorted === 'up'){
        sortedAnswers.sort((a, b) => (a.score - b.score));
        sortIcon = '^';
    } else if(sorted === 'down'){
        sortedAnswers.sort((a, b) => -(a.score - b.score));
        sortIcon = 'v';
    }
    // in this way whenever the state sorted is CHANGED the callback is reccalled and recomputed

    function sortedByScore(){
        if(sorted === 'none')
            setSorted('up');
        if(sorted === 'up')
            setSorted('down');
        if(sorted === 'down')
            setSorted('none');
        
        console.log('sorted');
    }

    // DERIEV STATE --> deriving a local state from a global ones
    // generally a bad idea: (1- very difficult to track the changes; 2- duplication of information)
    // const [sortedAnswers, setSortedAnswers] = useState(props.answer);
    // function sortByScore(){
    //     setSortedAnswers((old) =>{
    //         let temp = [...old];
    //         temp.sort((a, b) => -(a.score - b.score))
    //         return temp
    //     })
    // }


    return <>
        <h2>Answers:</h2>
        <Table hover>
            <thead >
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Text</th>
                    <th scope="col">Author</th>
                    <th scope="col" onClick={sortedByScore}>Score {sortIcon}</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {sortedAnswers.map(a => <AnswerRow key={a.id} answer={a} deleteAnswer={props.deleteAnswer} upVoteAnswer={props.upVoteAnswer} />)}
            </tbody>
            <tfoot>
            </tfoot>
        </Table>
    </>
}

function AnswerRow(props) {
    return <tr>
        <td>{props.answer.date.format('DD/MM/YYYY')}</td>
        <td>{props.answer.text}</td>
        <td>{props.answer.author}</td>
        <td>{props.answer.score}</td>
        <td><Button variant='secondary' onClick={()=>{props.upVoteAnswer(props.answer.id)}}>VOTE</Button>{' '}
        <Button variant='warning' onClick={()=>{props.deleteAnswer(props.answer.id)}}>DELETE</Button></td>
    </tr>
}

export { QuestionWithAnswers };