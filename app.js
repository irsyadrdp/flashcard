//const mainRoutes = require('./routes/routes.js');
const indexRoutes = require('./routes/index.js');	//include file index.js dari folder routes
const cardRoutes = require('./routes/cards.js');	//include file cards.js dari folder routes
const helloRoutes = require('./routes/hello.js');	//include file hello.js dari folder routes
const byeRoutes = require('./routes/bye.js');		//include file bye.js dari folder routes
	
const bodyParser = require('body-parser');		//include body-parser module supaya bisa baca request dari form di html
const cookieParser = require('cookie-parser');	//include cookie-parser module untuk ngolah data ke cookies	
const express = require('express');				//include express
const app = express();							//buka expressnya

const port = 27099;								//set url port yang akan dipakai 


//bisa pake body-parser, multer atau formidable
app.use(bodyParser.urlencoded({extended:true})); 	//gunakan bodyParsernya
													//false untuk string & array, true untuk any type 
app.use(cookieParser());							//gunakan cookies
//css
app.use('/public', express.static('public'));		//bikin folder /public jadi static dengan nama "public" untuk ngebaca css 

app.set('view engine', 'pug');						//pasang mesin template pug


	//MIDDLEWARE ROUTES
	//app.use(mainRoutes);
	//gunakan middleware routes yang sudah dideklarasi diatas
	app.use('/', indexRoutes);			
	app.use('/cards', cardRoutes);		
	app.use('/hello', helloRoutes);
	app.use('/bye', byeRoutes);



	//MIDDLEWARE GENERAL
	//Untuk handle error kalao uri url tidak didefinisi di router
	app.use((req, res, next) =>{
		//set locals dengan nama username
		res.locals.username = req.cookies.username
		//console.log("constructor");

		//error yang akan ditampilkan
		let errornya = new Error("Page Not Found Dude.")
		//set status code error
		errornya.status=404;

		//panggil middleware error
		next(errornya);
	});

	

	//ERROR MIDDLEWARE, disimpan paling terakhir
	//setiap ada error psti manggil ini:
	app.use((err, req, res, next) => {
		//set locals dengan nama status untuk menampilkan error status code
		res.locals.status = err.status;
		
		//set locals dengan nama errorMessage untuk menampilkan error message
		res.locals.errorMessage = err.message;
		
		//tampilkan page error
		res.render('error');
		
		//res.send(err.message);
	})



//jalankan servernya
//app.listen(14042);
app.listen(port, () =>{
	console.log("Udah nyala");
})
