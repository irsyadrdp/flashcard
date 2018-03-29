const express = require('express');		//panggil express
const router = express.Router();		//bikin routernya
										//pake .Router() karena kita bikin rute modular

//ROUTES
	//bikin route untuk url home
	router.get('/', (req, res) => {
		//ngecek apakah di cookies browser telah ada cookie dengan nama username?
		if(req.cookies.username){ //jika ada
			//set locals dengan nama "username" untuk ditampilkan di halaman website
			res.locals.username = req.cookies.username;

			//tampilkan halaman index.pug
			res.render("index"); //jalanin pug index.html
		}else{
			//jika cookies tidak ada, maka redirect untuk menampilkan halaman hello.pug
  			res.redirect('/hello');
		}
	});

//export router yang telah dibuat diatas, untuk digunakan oleh file lain yang melakukan require ke file ini 
module.exports = router;