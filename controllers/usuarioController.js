const Usuario = require('../models/usuarioModel'); 

function login(req, res) {
    res.render('login');
  }

async function autenticar(req,res){
    const user= await Usuario.autenticar(req.body.email,req.body.senha);
    console.log(user);
    if(user){
        req.session.user = {id: user.id};
        
    }
}


  module.exports = {login,autenticar};
  