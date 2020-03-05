import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
      const    activeLink = {
            fontWeight: "bold",
            color: "#f18381"
          };
      return (
      <footer className="container-fluid mt-5 mb-3">
            <div className="row">
                  <div className="col-12">
                        <hr/>
                  </div>
                  <div className="col-12 text-center">
                        <ul className="list-inline">
                              <li className="list-inline-item">
                                    <NavLink activeStyle={activeLink} className="nav-link"  to="/check-order-status" >Check Order Status</NavLink>
                              </li>
                              <li className="list-inline-item">
                                    <NavLink activeStyle={activeLink} className="nav-link"  to="/terms-of-service" >Terms Of Service</NavLink>
                              </li>
                              <li className="list-inline-item">
                                    <NavLink activeStyle={activeLink} className="nav-link"  to="/returns-policy" >Returns Policy</NavLink>
                              </li>
                              <li className="list-inline-item">
                                    <NavLink activeStyle={activeLink} className="nav-link" to="/privacy-policy">Privacy Policy</NavLink>
                              </li>
                        </ul>
                  </div>
                  <div className="col-12">
                        <div className=" pt-3 pb-2 text-center">
                          Made with <span role="img" aria-label="img">💘</span> in Israel.
                          <p className="mt-4">
                         Copyright © 2019 Ekaterina Preobrazhenski. All Rights Reserved.
                         </p>
                        </div>
                  </div>
            </div>
      </footer>
      )
}

export default Footer;