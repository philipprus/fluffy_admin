
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
    
      if ( (login === (process.env.LOGIN_ADMIN || "login12345")) && (password === (process.env.PASSWORD_ADMIN || "password12345")) ) return true;
      
      return false;
    };      

module.exports = {authenticate};