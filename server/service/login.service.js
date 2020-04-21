const dotenv = require('dotenv').config();
const authenticate = async ({login, password}) => {
      try {
            if(checkPass(login, password)) return true;
            return false;
      } catch (e) {
            console.log(e);
            throw Error("Error add order");
      }
}

const checkPass = (login, password) => {
      if ( (login === (dotenv.parsed.REACT_APP_LOGIN_ADMIN || "login12345")) && (password === (dotenv.parsed.REACT_APP_PASSWORD_ADMIN || "password12345")) ) return true;
      
      return false;
    };      

module.exports = {authenticate};