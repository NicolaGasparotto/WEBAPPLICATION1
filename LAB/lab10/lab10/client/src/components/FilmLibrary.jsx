import 'dayjs';

import { Table, Form, Button } from 'react-bootstrap/'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FilmLibrary(props) {
  const filteredFilms = props.films;

  const navigate = useNavigate();

  return (
    <>
      <Table striped>
        <tbody>
          { filteredFilms.map((film) => <FilmRow key={film.id} waiting={props.waiting} 
                                                               filmData={film} deleteFilm={props.deleteFilm} />) }
        </tbody>
      </Table>
      <Button variant="primary" size="lg" className="fixed-right-bottom" disabled={props.waiting} onClick={() => { navigate('/add'); } }>&#43;</Button>
    </>
  );
}
  
function FilmRow(props) {

  const formatWatchDate = (dayJsDate, format) => {
    return dayJsDate ? dayJsDate.format(format) : '';
  }
  
  const navigate = useNavigate();

  const film = props.filmData;

  return(
    <tr aria-disabled={props.waiting}>  
      <td>
        <Button variant='primary' onClick={() => {
          navigate('/edit/' + props.filmData.id, {
            state: 
            {'id': film.id, 'title': film.title, 'favorite': film.favorite, 'watchDate': film.watchDate, 'rating': film.rating} 
          }
          );
        }}>
          <i className="bi bi-pencil-square"/>
        </Button>
        {' '}
        <Button variant='danger'> 
          <i className="bi bi-trash" onClick={() => { props.deleteFilm(props.filmData.id) }} />
        </Button>
      </td>
      <td>
          <p className={props.filmData.favorite ? "favorite" : ""} >
          {props.filmData.title}
        </p>
      </td>
      <td>
        <Form.Check type="checkbox" label="Favorite" checked={props.filmData.favorite} onChange={(event) => { props.filmData.favorite = event.target.checked  }}/>
      </td>
      <td>
        <small>{formatWatchDate(props.filmData.watchDate, 'MMMM D, YYYY')}</small>
      </td>
      <td>
        <Rating rating={props.filmData.rating} maxStars={5} updateRating={(newRating) => props.updateFilm({ ...props.filmData, rating: newRating })}/>
      </td>
    </tr>
  );
}

function Rating(props) {
  return [...Array(props.maxStars)].map((el, index) =>
    <i key={index} className={(index < props.rating) ? "bi bi-star-fill" : "bi bi-star"} onClick={() => props.updateRating(index+1)}/>
  )
}

export { FilmLibrary };
