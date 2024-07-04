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
      console.log(1);
      return res.redirect('/tarefas');
    } else {
      console.log(2);
      req.session.msg = {
           class: "alert-danger",
           msg: "Usuário não encontrado!"
      }
  console.log(3);
  return res.redirect('/login');
    }
  } 

  function logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
      console.log(err);
      return res.redirect('/tarefas');
      } else {
      return res.redirect('/login');
      }
    });
    }
  



  module.exports = {login, autenticar, logout};
  