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