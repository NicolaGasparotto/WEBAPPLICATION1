/*
 * [2022/2023]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 7
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import { Container } from 'react-bootstrap';
import { BrowserRouter, Outlet, Route, Routes, useParams } from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { NavigationResponsive } from './components/Navigation';
import { PageNotFound } from './components/PageNotFound';
import { useState } from 'react';

function App(){
  const [ activeFilter, setActiveFilter ] = useState('filter-all');
  
  const changeFilter = (filter) => {
    setActiveFilter((oldFilter) => {oldFilter = filter; return oldFilter;});
  }

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

  return <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage filters={filters} activeFilter={filters['filter-all']} onSelect={changeFilter}/>} />
        <Route path={`/${activeFilter}`} element={<HomePage filters={filters} activeFilter={activeFilter} onSelect={changeFilter}/>}/>
        {/** TO DO: ADD AND EDIT ROUTES */}
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>;

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
