import dayjs from "dayjs";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddOrEditFilm(props) {

    const [date, setDate] = useState(
        props.mode === "edit" ? dayjs(props.initialValue.watchDate).format('YYYY-MM-DD') :  
        dayjs().format('DD-MM-YYYY') 
    );
    const [title, setTitle] = useState(
        props.mode === "edit" ? props.initialValue.title : " "
    );
    const [score, setScore] = useState(
        props.mode === "edit" ? props.initialValue.rating : 0
    );
    const [favorite, setFavorite] = useState(
        props.mode === "edit" ? props.initialValue.favorite : false
    );
    
    const [err, setErr] = useState('');

    function handleAdd(){
        if(title !== '' && score !== ''){
            props.handleAdd({
                title: title,
                favorite: favorite, 
                watchDate: date, 
                rating: score
            });
        } else {
            setErr('Please fill all the fields');
        }
    }

    function handleSave(){
        if(title !== '' && score !== ''){
            props.handleSave({
                id: props.initialValue.id,
                title: title,
                favorite: favorite, 
                watchDate: date, 
                rating: parseInt(score)
            });
        } else {
            setErr('Please fill all the fields modifying the film values');
        }
    }

    return <>
        {err && <p>{err}</p>}
            <Form.Group controlId="filmDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" placeholder="Enter date" name="date" value={date} onChange={(ev) => setDate(ev.target.value)}/>
            </Form.Group>
            
            <Form.Group controlId="filmTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value={title} name="title" onChange={(ev) => setTitle(ev.target.value)}/>
            </Form.Group>

            <Form.Group controlId="filmScore">
                <Form.Label>Score</Form.Label>
                <Form.Control type="number" placeholder="Enter score" value={score} name="score" onChange={(ev) => setScore(ev.target.value)}/>
            </Form.Group>

            <br/>
            <Form.Group controlId="filmFavorite">
                <Form.Check type="checkbox" label="Favorite" checked={favorite} name="favorite" onChange={(ev) => setFavorite(ev.target.checked)}/>
            </Form.Group>

            <Form.Group controlId="addButton">
                <Form.Label className="fw-light">&nbsp;</Form.Label><br/>
                {props.mode==='add' && <Button variant="success" id="addButton" onClick={handleAdd}>ADD</Button>}
                {props.mode==='edit' && <Button variant="success" id="saveButton" onClick={handleSave}>SAVE</Button>}
                {' '}<Button variant="danger" id="cancelButton" onClick={props.handleCancel}>CANCEL</Button>
            </Form.Group>
    </>;
}

export { AddOrEditFilm };