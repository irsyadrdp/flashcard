const express = require('express');		//panggil express
const router = express.Router();		//pake .Router() karena kita bikin rute modular

//ROUTES
	router.get('/', (req, res, next) => {
		if(req.cookies.username){
			res.locals.username = req.cookies.username;
			res.render("index"); //jalanin pug index.html
		}else{
  			res.redirect('/hello');
		}
	});

	router.get('/cards', (req, res) => {
		//res.locals.variabel = "Aku adalah siapa?";
		//res.locals.hint = "Kamu pernah ketemu";
		res.locals = {
			variabel : "Aku adalah siapa?",
			//hint 	 : "Kamu pernah ketemu." 
			colors 	 : ["red","green","blue"],
		};

		res.render("cards"); //locals
	});

	router.get('/hello', (req, res, next) => {
		if(req.cookies.username){
			//res.redirect('/');
			let error = new Error("Anda sudah login");
			next(error);
		}else{
			res.render("hello"); //locals
		}
	});

	router.post('/hello', (req, res) => {
		//res.send(req.body.username);
		//res.send(req.body);	//read as json
		//res.json(req.body);	//read as json

		res.locals = {
			username : req.body.username
		};
		res.cookie("username", req.body.username); //create cookies
		res.render("index");
	});

	router.post('/bye', (req,res) => {
		res.clearCookie("username"); //hapus cookie username
		res.redirect('/hello');
	});
	

	//export router yang telah dibuat diatas, untuk digunakan oleh file lain yang melakukan require ke file ini 
	module.exports = router;