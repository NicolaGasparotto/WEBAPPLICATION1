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
          { filteredFilms.map((film) => <FilmRow key={film.id} filmData={film} />) }
        </tbody>
      </Table>
      <Button variant="primary" size="lg" className="fixed-right-bottom" onClick={() => { navigate('/add'); } }>&#43;</Button>
    </>
  );
}
  
function FilmRow(props) {

  const [isChecked, setIsChecked] = useState(props.filmData.favorite);

  const formatWatchDate = (dayJsDate, format) => {
    return dayJsDate ? dayJsDate.format(format) : '';
  }
  
  const navigate = useNavigate();

  useEffect(() => {
    setIsChecked(props.filmData.favorite);
  }, [props.filmData.favorite]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    props.filmData.favorite = event.target.checked;
    props.updateFilm(props.filmData);
  };

  return(
    <tr>
      <td>
        <Button variant='primary' onClick={() => {
          navigate('/edit/' + props.filmData.id);
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
        <Form.Check type="checkbox" label="Favorite" checked={isChecked} onChange={handleCheckboxChange}/>
      </td>
      <td>
        <small>{formatWatchDate(props.filmData.watchDate, 'MMMM D, YYYY')}</small>
      </td>
      <td>
        <Rating rating={props.filmData.rating} maxStars={5}/>
      </td>
    </tr>
  );
}

function Rating(props) {
  return [...Array(props.maxStars)].map((el, index) =>
    <i key={index} className={(index < props.rating) ? "bi bi-star-fill" : "bi bi-star"} />
  )
}

export default FilmLibrary;
