const loginService = require('../service/login.service');
var jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const data = req.body;
      try {
        const result = await loginService.authenticate(data);
            if(result) {
              var token = jwt.sign({ id: data.login }, process.env.SECRET_LOGIN_KEY || "secret_login_key", {
                expiresIn: 86400 // expires in 24 hours
              });
              return res.status(200).send({auth:result, token: token});
            }
          } catch (e) {
            console.log(e);
            return res.sendStatus(400);
          } 
}

const auth = async (req, res) => {
  const {token} = req.body;
  try {
    var decoded = jwt.verify(token, process.env.SECRET_LOGIN_KEY || "secret_login_key");
    if(decoded.id) {
      return res.status(200).send(true);
    }
  } catch(err) {
    // err
    console.log(err);
    return res.sendStatus(400);
  }
}
module.exports =  { login, auth };
