import { Row, Col } from 'react-bootstrap/';
import '../App.css'
import FILMS from './../films'

import { Filters } from './Filters';
import { FilmTable } from './FilmLibrary'; 

import { useState } from 'react';

function HomePage(props){
    const filters = props.filters;
    const activeFilter = props.activeFilter;
    const setActiveFilter = props.changeFilter;
    
    const [films, setFilms] = useState([...FILMS]);

        // all related functions to films state 
    const deleteFilm = (id) => {
        console.log('deleting film with id: ' + id + '...');
        setFilms((oldFilms) => (oldFilms.filter((film) => (film.id !== id))) );
        //console.log(films);
    }

    const addFilm = (film) => {
        setFilms((oldFilms) => {
        const newId = Math.max(...oldFilms.map(film => film.id)) + 1;
        const newFilm = {id: newId, title: film.title, favorite: film.favorite, watchDate: dayjs(film.watchDate), rating: parseInt(film.rating)};
        const tmpFilm = [...oldFilms, newFilm];
        // console.log(tmpFilm);
        return tmpFilm;
        });
    }

    const editFilm = (film) => {  
        console.log(film);
        setFilms((oldFilms) => {
        const tmpFilm = oldFilms.map((f) => {
            if(f.id === film.id) {
            return film;
            } else {
            return f;
            }
        });
        // console.log(tmpFilm);
        return tmpFilm;
        });
    }

    return <Row className='vh-100'>
        <div className="d-md-block col-md-3 col-12 bg-light below-nav collapse" id="left-sidebar">
          <Col>
          <Filters items={filters} selected={activeFilter} setFilter={setActiveFilter}/>
          </Col>
        </div>

        <Col md={8} xl={9} className="below-nav">
        <h1 className="pb-3">Filter: <span className="notbold">{activeFilter.label}</span></h1>
          <FilmTable films={films.filter(filters[activeFilter.id].filterFunction)}
                     deleteFilm={deleteFilm} addFilm={addFilm} editFilm={editFilm} />
        </Col>
    </Row>
    ;
}

export { HomePage };