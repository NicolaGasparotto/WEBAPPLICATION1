function AnswerForm(props){
    return <div>
            <Form.Group controlId="answerDate">
                <Form.Label className='fw-light'>Date</Form.Label>
                <Form.Control type="date" name="date" placeholder="Enter date" />
            </Form.Group>
    
            <Form.Group controlId="answerText">
                <Form.Label className='fw-light'>Answer text</Form.Label>
                <Form.Control type="text" name="text" placeholder="Enter Answer" />
            </Form.Group>
    
            <Form.Group controlId="answerAuthor">
                <Form.Label className='fw-light'>Author</Form.Label>
                <Form.Control type="text" name="author" placeholder="Author's name" />
            </Form.Group>
    
            
            <Form.Group controlId="addButton">
            <Form.Label className='fw-light'>&nbsp;</Form.Label><br/>
                <Button variant='success' id="addbutton">ADD</Button>
                </Form.Group>
    </div>;
}

export {AnswerForm} ;