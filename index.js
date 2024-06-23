

const express = require('express'); 
const session = require('express-session');
const tarefaController = require('./controllers/tarefaController'); 
const usuarioController = require('./controllers/usuarioController');
const app = express(); 
const port = 3000; 

app.use(session({ secret: '123456', cookie: { maxAge: 60000 }}));

app.set('view engine', 'ejs'); 
app.get('/', (req, res)=>{res.send("<h1>API Tarefas</h1>")});

app.use(express.urlencoded({ extended: true })); 

app.get('/tarefas', (req, res)=>{
    if(req.session.user){
      tarefaController.getTarefas(req,res);
    }else{
      res.redirect('/login');
    }
  });
   
app.post('/tarefas', tarefaController.addTarefa); 
app.get('/tarefa/delete/:id', tarefaController.deleteTarefa);

app.get('/login',usuarioController.login);
app.post('/usuario/autenticar', usuarioController.autenticar);

app.listen(port, () => { 
console.log(`Servidor rodando em http://localhost:${port}`);
});

