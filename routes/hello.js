const express = require('express');		//panggil express
const router = express.Router();		//bikin routernya
										//pake .Router() karena kita bikin rute modular

//ROUTES
	
	//bikin route get untuk url yang akses /hello
	//pakai router next, untuk redirect ke middleware error jika ditemukan error
	router.get('/', (req, res, next) => {
		//ngecek apakah di cookies browser telah ada cookie dengan nama username?
		if(req.cookies.username){
			//kalau cookiesnya sudah ada, maka kasih notif error karena sudah login
			let error = new Error("Anda sudah login");
			//redirect ke middleware error
			next(error);
		}else{
			//jika cookies tidak ada, berarti bisa masuk ke hello untuk login
			res.render("hello"); //locals
		}
	});

	//bikin router jika ada request post ke url /hello --> untuk login
	router.post('/', (req, res) => {
		//res.send(req.body.username);
		//res.send(req.body);	//read as json
		//res.json(req.body);	//read as json

		//set locals dengan nama usernama untuk ditampilkan di halaman website 
		res.locals = {
			username : req.body.username //username didapat dari form input dengan name="username"
		};

		//bikin cookie dengan isi username yang diinput saat login
		res.cookie("username", req.body.username); //create cookies

		//tampilkan halaman index.pug
		res.render("index");
	});


//export router yang telah dibuat diatas, untuk digunakan oleh file lain yang melakukan require ke file ini 
module.exports = router;