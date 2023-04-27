import { useState } from 'react'

import { Container, Navbar, Form, Button } from 'react-bootstrap';
import { CollectionPlay, PersonCircle } from "react-bootstrap-icons";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return <>
    <header>
      <Navbar sticky="top" variant='dark' bg="primary" expand="lg" className='mb-3'>
        <Container fluid>
        <Navbar.Toggle aria-controls='titolo'/>
          <Navbar.Brand> <CollectionPlay></CollectionPlay> {' '} FilmLibrary
          </Navbar.Brand>
          <Form className="form-inline my-2 my-lg-0 mx-auto d-none d-md-block">
            <Form.Control type="search" placeholder="Search" aria-label="Search"/>
          </Form>
          <Navbar.Text href='#user'><PersonCircle size={30}></PersonCircle></Navbar.Text>
        </Container>
      </Navbar>
    </header>
    <aside className="collapse d-md-block col-md-3 col-12 bg-light below-nav" id="left-sidebar">
          <div className="list-group list-group-flush">
            <a href="#" id="filter-all" className="list-group-item list-group-item-action active">All</a>
            <a href="#" id="filter-favorites" className="list-group-item list-group-item-action">Favorites</a>
            <a href="#" id="filter-best" className="list-group-item list-group-item-action">Best Rated</a>
            <a href="#" id="filter-seen-last-month"className="list-group-item list-group-item-action">Seen Last Month</a>
            <a href="#" id="filter-unseen" className="list-group-item list-group-item-action">Unseen</a>
          </div>
      </aside>
    <main>
      <h1 className='collapse d-md-block' id='titolo'></h1>
      <Container>
      </Container>
    </main>
  </>
}

export default App
