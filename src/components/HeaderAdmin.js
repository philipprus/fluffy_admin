import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logotype from '../images/fluffy_logo.svg';
import { isAuthenticated, logout } from '../utils/utils';
import Button from 'react-bootstrap/Button';

const HeaderAdmin = props => {

  const activeLink = {
    fontWeight: 'bold',
    color: '#f18381',
  };

  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">
        <Image src={logotype} fluid alt="Logotype" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-center">
          <NavLink exact activeStyle={activeLink} className="nav-link" to="/">
            Order
          </NavLink>
          <NavLink activeStyle={activeLink} className="nav-link" to="/review">
            Review
          </NavLink>
          <NavLink activeStyle={activeLink} className="nav-link" to="/giftcard">
            Gift card
          </NavLink>
          {/* <NavLink activeStyle={activeLink} className="nav-link" to="/admin/blog">
            Blog
          </NavLink> */}
          <NavLink activeStyle={activeLink} className="nav-link" to="/portfolio">
            Portfolio
          </NavLink>
        </Nav>
      </Navbar.Collapse>
          {isAuthenticated() && <Button variant="info" onClick={logout}>Log out</Button>}
    </Navbar>
  );
};

export default HeaderAdmin;
