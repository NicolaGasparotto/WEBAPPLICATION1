/*
 * [2022/2023]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 5
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import dayjs from 'dayjs';

import { React, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap/'

import FILMS from './films'

import {Navigation, NavigationResponsive} from './components/Navigation';
import Filters from './components/Filters';
import FilmTable from './components/FilmLibrary';

function App() {

  // This state contains the list of films
  const [films, setFilms] = useState([...FILMS]);

  // This state contains the active filter
  const [activeFilter, setActiveFilter] = useState('filter-all');
  
  // all related functions to films state 
  const deleteFilm = (id) => {
    console.log('deleting film with id: ' + id + '...');
    setFilms((oldFilms) => (oldFilms.filter((film) => (film.id !== id))) );
    //console.log(films);
  }

  const addFilm = (film) => {
    setFilms((oldFilms) => {
      const newId = Math.max(...oldFilms.map(film => film.id)) + 1;
      const newFilm = {id: newId, title: film.title, favorite: film.favorite, watchDate: dayjs(film.watchDate), rating: film.rating};
      const tmpFilm = [...oldFilms, newFilm];
      console.log(tmpFilm);
      return tmpFilm;
    });
  }

  const editFilm = (film) => {  
    setFilms((oldFilms) => {
      oldFilms.map((oldFilm) => (oldFilm.id === film.id ? film : oldFilm));
    });
  }

  /**
   * Defining a structure for Filters
   * Each filter is identified by a unique name and is composed by the following fields:
   * - A label to be shown in the GUI
   * - An ID (equal to the unique name), used as key during the table generation
   * - A filter function applied before passing the films to the FilmTable component
   */
  const filters = {
    'filter-all':       { label: 'All', id: 'filter-all', filterFunction: () => true},
    'filter-favorite':  { label: 'Favorites', id: 'filter-favorite', filterFunction: film => film.favorite},
    'filter-best':      { label: 'Best Rated', id: 'filter-best', filterFunction: film => film.rating >= 5},
    'filter-lastmonth': { label: 'Seen Last Month', id: 'filter-lastmonth', filterFunction: film => isSeenLastMonth(film)},
    'filter-unseen':    { label: 'Unseen', id: 'filter-unseen', filterFunction: film => film.watchDate ? false : true}
  };

  const isSeenLastMonth = (film) => {
    if('watchDate' in film) {  // Accessing watchDate only if defined
      const diff = film.watchDate.diff(dayjs(),'month')
      const isLastMonth = diff <= 0 && diff > -1 ;      // last month
      return isLastMonth;
    }
}

  return (
    <Container fluid className='App'>

      <NavigationResponsive/>

      <Row className="vh-100">
        
        { /* The first column represent the listGroup of All */}
        <div className="d-md-block col-md-3 col-12 bg-light below-nav collapse" id="left-sidebar">
          <Col>
            <Filters items={filters} selected={activeFilter} onSelect={setActiveFilter}/>
          </Col>
        </div>

        <Col md={8} xl={9} className="below-nav">
          <h1 className="pb-3">Filter: <span className="notbold">{filters[activeFilter].label}</span></h1>
          <FilmTable activeFilter={filters[activeFilter].label}
                     films={films.filter(filters[activeFilter].filterFunction)}
                     deleteFilm={deleteFilm} addFilm={addFilm} editFilm={editFilm} />
        </Col>
      </Row>

    </Container>
  );
}

export default App;
