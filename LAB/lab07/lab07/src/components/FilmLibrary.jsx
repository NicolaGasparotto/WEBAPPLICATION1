import dayjs from "dayjs";
import { Table, Form, Button } from 'react-bootstrap/'
import { React, useState, useEffect } from 'react';
import { AddOrEditFilm } from './AddOrEditFilm';

// TO DO:
// 1. Edit functionality button
// 2. Verification Modules
// 3. ChekcBox Favorite functionality
 
function FilmTable(props) {

  // This state contains the mode of the component
  // Possible values are: 'view', 'add', 'edit'
  const [mode, setMode] = useState('view');
  
  // This state contains first a bool value to know if the film has been edited or Not then the values of the film to be edited
  const [editedFilm, setEditedFilm] = useState(false);

  function handleAdd(film) {
    console.log("Add button clicked");
    props.addFilm(film);
    setMode('view');
  }

  function handleSave(film) {
    props.editFilm(film);
    console.log("Filme edited correctly");
    setMode('view');
  }

  function handleCancel() {
    console.log("Cancel button clicked");
    setMode('view');
  }

  function handleEdit(id) {
    console.log("Edit button clicked");
    console.log(id, props.films.filter((f) => (f.id === id))[0]);
    setEditedFilm(props.films.filter((f) => (f.id === id))[0]);
    setMode('edit');
  }

  const films = props.films;
  // const activeFilter = props.activeFilter; not used??
  if(films){
    return (
      <>
        <Table striped>
          <thead >
                  <tr>
                      <th scope="col">Film Title</th>
                      <th scope="col">Favourite</th>
                      <th scope="col">Watching Date</th>
                      <th scope="col">Score</th>
                      <th scope="col">Actions</th>
                  </tr>
              </thead>
          <tbody>
            { films.map((film) => <FilmRow filmData={film} key={film.id} 
                                          handleEdit={handleEdit} deleteFilm={props.deleteFilm} handleSave={handleSave}/>) }
          </tbody>
        </Table>
        { mode === 'add' && <AddOrEditFilm mode={mode} handleAdd={handleAdd} handleCancel={handleCancel}/>}
        { mode === 'edit' && <AddOrEditFilm mode={mode} initialValue={editedFilm} handleSave={handleSave} handleCancel={handleCancel}/>}
        { mode === 'view' && <Button variant="primary" size="lg" className="fixed-right-bottom" onClick={ () => setMode('add') }> &#43; </Button>}
      </>
    );
  }
}
  
function FilmRow(props) {
    
    const [isChecked, setIsChecked] = useState(props.filmData.favorite);
    
    useEffect(() => {
      setIsChecked(props.filmData.favorite);
    }, [props.filmData.favorite]);

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
      props.filmData.favorite = event.target.checked;
      props.handleSave(props.filmData);
    };

    return(
      <tr>
        <td>
           <p className={props.filmData.favorite ? "favorite" : ""} >
            {props.filmData.title}
          </p>
        </td>
        <td>
          <Form.Check type="checkbox" label="Favorite" checked={isChecked} onChange={handleCheckboxChange}/>
        </td>
        <td>
          <small>{dayjs(props.filmData.watchDate).format('MMMM D, YYYY')}</small>
        </td>
        <td>
          <Rating rating={props.filmData.rating} maxStars={5}/>
        </td>
        <td>
          <Button variant="danger" onClick={() => props.deleteFilm(props.filmData.id)}>DELETE</Button>{' '}
          <Button variant="primary" onClick={() => props.handleEdit(props.filmData.id)}>EDIT</Button>
        </td>
      </tr>
    );
}

function Rating(props) {
  return [...Array(props.maxStars)].map((el, index) =>
    <i key={index} className={(index < props.rating) ? "bi bi-star-fill" : "bi bi-star"} />
  )
}

export { FilmTable };
