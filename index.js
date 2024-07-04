const express = require('express'); 
var expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const tarefaController = require('./controllers/tarefaController'); 
const usuarioController = require('./controllers/usuarioController');
const app = express(); 
const port = 3000; 

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret:'i1n2f3o4'}));

app.set('view engine', 'ejs'); 
app.get('/', (req, res)=>{res.send("<h1>API Tarefas</h1>")});

app.use(express.urlencoded({ extended: true })); 

app.use((req, res, next) => {
	if(!req.session.user){
		console.log(req.originalUrl);
		if(req.originalUrl == "/login" || req.originalUrl == "/usuario/autenticar"){
			app.set('layout', './layouts/login');
			res.locals.layoutVariables = {
				url : process.env.URL,
				img : "/img/",
				style : "/css/",
				title: 'Login' 
			};
			next();			
		}else{
			console.log(0);
			res.redirect('/login');
		}	
	}else{
		app.set('layout', './layouts/tarefas');
		res.locals.layoutVariables = {
			url : process.env.URL,
			img : "/img/",
			style : "/css/",
			title: 'Tarefas',
			user: req.session.user, 
		};
		if(req.session.msg){
			res.locals.layoutVariables.msg = req.session.msg;
			delete req.session.msg;
		}
		next();// Continua para a próxima etapa (rota ou middleware)
	}	
});



app.get('/tarefas', (req, res)=>{
    if(req.session.user){
      tarefaController.getTarefas(req,res);
    
    }else{
      return res.redirect('/login');
    }
  });
   
app.post('/tarefas', tarefaController.addTarefa); 
app.get('/tarefa/delete/:id', tarefaController.deleteTarefa);

app.get('/login',usuarioController.login);
app.post('/usuario/autenticar', usuarioController.autenticar);
app.get('/logout', usuarioController.logout);
app.listen(port, () => { 
console.log(`Servidor rodando em http://localhost:${port}`);
});

