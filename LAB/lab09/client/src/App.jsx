/*
 * [2022/2023]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 6
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';


import { React, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap/'

import { NavigationResponsive} from './components/Navigation';
import Filters from './components/Filters';
import FilmLibrary from './components/FilmLibrary';
import { PageNotFound } from './components/PageNotFound';

import { listFilms } from './API';

import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
// import { AddFilmPage } from './components/AddFilmPage';
// import { EditFilmPage } from './components/EditFilmPage';

function App() {

  const filters = [ 'All', 'Favorites', 'Unseen', 'SeenLastMonth', 'BestRated' ];

  return <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout filters={filters}/>}>
          <Route index element={<MainLayout activeFilter={'All'}/>}/>
          {filters.map(key => (
          <Route key={key} path={`/filter/${key}`} element={<MainLayout activeFilter={key}/>} />
          ))}
          {/**
          <Route path='/edit/:filmId' element={<EditFilmPage />} />
                         In line function declaration vvvvvvvvvvvvvvvvvvvvvvvvvvvv    
          <Route path='/add' element={<AddFilmPage />} />
          */}
          <Route path='*' element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  ;
}

function DefaultLayout(props){
  
  const location = useLocation(); // it returns the url path
  const filterName = location.pathname.split('/').pop(); // it takes only the last part of the url path
  const activeFilter = props.filters.includes(filterName) ?  filterName : 'All'; // if it is a valid filter, it is used, otherwise 'All' is used

  return <>
    <header>
      <NavigationResponsive/>
    </header>
    <main>
      <Container fluid>
        <Row className="vh-100">
          <div className="d-md-block col-md-3 col-12 bg-light below-nav collapse" id="left-sidebar">
            <Col><Filters filters={props.filters} selected={activeFilter}/></Col>
          </div>
          <Col style={{marginTop: '5rem'}} >
            <Outlet />
          </Col>
        </Row>
      </Container>
    </main>
  </>
  ;
}

function MainLayout(props){
  
  // retriving the films from API based on the filter selected
  const [films, setFilms] = useState([]);

  useEffect(() => {
    listFilms(props.activeFilter).then((list) => {
      setFilms(list);
    }
    );
  }, [props.activeFilter]);

  return <>
      <h1 className="pb-3">Filter: <span className="notbold">{props.activeFilter}</span></h1>
          <FilmLibrary films={films} />
    </>
  ;
}

export default App;
