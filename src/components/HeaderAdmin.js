import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logotype from '../images/fluffy_logo.svg';

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
          <NavLink exact activeStyle={activeLink} className="nav-link" to="/admin">
            Order
          </NavLink>
          <NavLink activeStyle={activeLink} className="nav-link" to="/admin/review">
            Review
          </NavLink>
          <NavLink activeStyle={activeLink} className="nav-link" to="/admin/giftcard">
            Gift card
          </NavLink>
          {/* <NavLink activeStyle={activeLink} className="nav-link" to="/admin/blog">
            Blog
          </NavLink> */}
          <NavLink activeStyle={activeLink} className="nav-link" to="/admin/portfolio">
            Portfolio
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderAdmin;
