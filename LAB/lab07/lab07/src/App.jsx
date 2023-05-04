/*
 * [2022/2023]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 6
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import dayjs from 'dayjs';

import { React, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap/'

import FILMS from './films'

import { NavigationResponsive} from './components/Navigation';
import Filters from './components/Filters';
import FilmLibrary from './components/FilmLibrary';
import { PageNotFound } from './components/PageNotFound';

import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

function App() {

  // This state contains the active filter
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = {
    'All':       { filterFunction: () => true},
    'Favorite':  { filterFunction: film => film.favorite},
    'Best':      { filterFunction: film => film.rating >= 5},
    'SeenLasstMonth': { filterFunction: film => isSeenLastMonth(film)},
    'Unseen':    { filterFunction: film => film.watchDate ? false : true}
  };

  const isSeenLastMonth = (film) => {
    if('watchDate' in film && film.watchDate) {  // Accessing watchDate only if defined
      const diff = film.watchDate.diff(dayjs(),'month')
      const isLastMonth = diff <= 0 && diff > -1 ;      // last month
      return isLastMonth;
    }
}

  // This state contains the list of films (it is initialized from a predefined array).
  const [films, setFilms] = useState(FILMS);

  // This state contains the last film ID (the ID is continuously incremented and never decresead).
  const [lastFilmId, setLastFilmId] = useState(FILMS[FILMS.length-1].id + 1);

  // This function add the new film into the FilmLibrary array
  const saveNewFilm = (newFilm) => {
    setFilms( (films) => [...films, {"id": lastFilmId, ...newFilm}] );
    setLastFilmId( (id) => id + 1 );
  }

  // This function updates a film already stored into the FilmLibrary array
  const updateFilm = (film) => {
    setFilms(oldFilms => {
      return oldFilms.map(f => {
        if(film.id === f.id)
          return { "id": film.id, "title": film.title, "favorite": film.favorite, "watchDate": film.watchDate, "rating": film.rating };
        else
          return f;
      });
    });
  }

  /**
   * [2022/2023]
   * Is important to observe that all the <Route> components are nested inside the MAIN <Route> component,
   * which is the one that defines the MAIN-Layout of the page -> then the other <Route> components are
   * rendered inside the MAIN-Layout. 
   */
  return <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout filters={filters} activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>}>
          <Route index element={<MainLayout filters={filters} activeFilter={activeFilter} films={films} updateFilm={updateFilm} saveNewFilm={saveNewFilm}/>}/>
          {Object.keys(filters).map(key => (
          <Route key={key} path={`/filter/${key}`} element={<MainLayout filters={filters} activeFilter={activeFilter} films={films} updateFilm={updateFilm} saveNewFilm={saveNewFilm} />}/>
          ))}
          <Route path='*' element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  ;
}

function DefaultLayout(props){
  return <>
    <header>
      <NavigationResponsive />
    </header>
    <main>
      <Container fluid>
        <Row className="vh-100">
          <div className="d-md-block col-md-3 col-12 bg-light below-nav collapse" id="left-sidebar">
            <Col><Filters items={props.filters} selected={props.activeFilter} setActiveFilter={props.setActiveFilter}/></Col>
          </div>
          <Col style={{marginTop: '5rem'}}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </main>
  </>
  ;
}

function MainLayout(props){
  const activeFilter = props.activeFilter;
  const filters = props.filters;
  const films = props.films;
  const saveNewFilm = props.saveNewFilm;
  const updateFilm = props.updateFilm;

  return <>
      <h1 className="pb-3">Filter: <span className="notbold">{activeFilter}</span></h1>
          <FilmLibrary films={films.filter(filters[activeFilter].filterFunction)}
                       saveNewFilm={saveNewFilm} updateFilm={updateFilm}/>
    </>
  ;
}

export default App;
