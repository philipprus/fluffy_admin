
const  { connectDb }  = require('./server/store/connection');
const express = require('express');
const path = require('path');
const routers = require('./server/routers');
const formData = require('express-form-data');
const cors = require('cors');

async function init() {
    await connectDb();

        
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
      
    app.use(cors()); 
    app.use(formData.parse());


    app.use(express.static(path.join(__dirname, 'build')));


    routers.forEach(o => app.use(`/api${o.prefix}`, o.router));

    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }); 
  
    let server = app.listen(process.env.PORT || 8080, () => {
        console.log("App listening on port %s", server.address().port);
        console.log("Press Ctrl+C to quit.");  
    });    
    
  }    
       
  init() 
    .catch(err => console.log('Error', err));
   