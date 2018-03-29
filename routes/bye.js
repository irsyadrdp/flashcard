const express = require('express');		//panggil express
const router = express.Router();		//bikin routernya
										//pake .Router() karena kita bikin rute modular

//ROUTES
	//bikin route post untuk url yang akses /bye
	router.post('/', (req,res) => {
		//hapus cookie yg ada di browser dengannama "username"
		res.clearCookie("username");
		
		//redirect ke /hello untuk menampilkan halaman website hello.pug
		res.redirect('/hello');
	});


//export router yang telah dibuat diatas, untuk digunakan oleh file lain yang melakukan require ke file ini 
module.exports = router;