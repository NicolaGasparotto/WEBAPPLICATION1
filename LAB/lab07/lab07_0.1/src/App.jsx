/*
 * [2022/2023]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 7
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import dayjs from 'dayjs';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { NavigationResponsive } from './components/Navigation';
import { PageNotFound } from './components/PageNotFound';
import { useState } from 'react';

function App(){
  
  
  const filters = {
    'All':       { filterFunction: () => true},
    'Favorites':  { filterFunction: film => film.favorite},
    'BestRated':      { filterFunction: film => film.rating >= 5},
    'SeenLastMonth': { filterFunction: film => isSeenLastMonth(film)},
    'Unseen':    {  filterFunction: film => film.watchDate ? false : true}
  };

  const isSeenLastMonth = (film) => {
    if('watchDate' in film) {  // Accessing watchDate only if defined
      const diff = film.watchDate.diff(dayjs(),'month')
      const isLastMonth = diff <= 0 && diff > -1 ;      // last month
      return isLastMonth;
    }
  }
  
  {/** To have the exact match is mandatory to explicit All the path, otherwise it will not match with label, but it wont match with PageNotFound */}
  

  return <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/*<Route index element={<HomePage filters={filters} activeFilter={filters['filter-all'].id} onSelect={setActiveFilter}/>} />*/}
          <Route index element={<HomePage filters={filters} activeFilter={filterLabels[0]}/>} />
          {/*<Route path='filter/:label' element={<HomePage filters={filters} activeFilter={filters[activeFilter].id} onSelect={setActiveFilter}/>}/>*/}
          {/** In this solution the match is exact and onSelect and ActiveFilter are not necessary, but the solution has to be changed, and I dont' give importance to do It in this lab*/}
          {filterLabels.map(label => 
            <Route key={label} path={`filter/${label}`} element={<HomePage filters={filters} activeFilter={label} />}/>
            )}
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ;
}

function MainLayout() {
  
  return <>
    <header>
      <NavigationResponsive />
    </header>
    <main>
      <Container fluid>
        <Outlet />
      </Container>
    </main>

  </>
}

export default App;
