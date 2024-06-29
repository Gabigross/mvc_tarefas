const Usuario = require('../models/usuarioModel'); 

function login(req, res) {
    res.render('login');
  }

  async function autenticar(req,res) { 
    const resp = await Usuario.autenticar(req.body.email, req.body.senha);
    if (resp && resp.length > 0) {
      req.session.user = resp[0];
      req.session.msg = {
           class: "alert-success",
           msg: "Usuário autenticado com sucesso!"
      }
      res.redirect('/tarefas');
    } else {
      req.session.msg = {
           class: "alert-danger",
           msg: "Usuário não encontrado!"
      }
  
  res.redirect('/login');
    }
  } 
  



  module.exports = {login,autenticar};
  