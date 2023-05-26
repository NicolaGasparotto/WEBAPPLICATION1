import 'bootstrap-icons/font/bootstrap-icons.css';

import {Navbar, Nav, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationResponsive = (props) => {
    return (
        <Navbar bg="primary" expand="md" variant="dark" fixed="top" className="navbar-padding">
            <Navbar.Toggle type="button" data-bs-toggle="collapse" data-bs-target="#left-sidebar"
             aria-controls="left-sidebar"  aria-label="Toggle sidebar" aria-expanded="false"/>
            <Navbar.Brand>
                <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
                    <i className="bi bi-collection-play icon-size"/> Film Library
                </Link>
            </Navbar.Brand>
            <Form className="my-2 my-lg-0 mx-auto d-none d-md-block" action="#" role="search" aria-label="Quick search">
                <Form.Control className="mr-sm-2" type="search" placeholder="Search" aria-label="Search query" />
            </Form>
            <Nav className="ml-md-auto">
            <Nav.Item>
                <Nav.Link>
                <i className="bi bi-person-circle icon-size"/>
                </Nav.Link>
            </Nav.Item>
            </Nav>
        </Navbar>
    );
}

export { NavigationResponsive};
