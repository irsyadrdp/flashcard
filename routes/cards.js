const express = require('express');		//panggil express
const router = express.Router();		//bikin routernya
										//pake .Router() karena kita bikin rute modular

//const data = require('../data/flashCardData.json').data;	//dikasih data supaya masuk langsung ke datanya, supaya munculnya bukan {object} {object} {object}
//const cards = data.cards;
//shorthandnya:
 const { data } = require('../data/flashCardData.json');	//baca json yang ada di file flashCardData.json, dengan nama key data
 const { cards } = data;	//karena object "data" punya object lagi didalamnya dengan nama "cards", maka object yg sudah dibuat dibuka lagi dengan nama "cards"




//ROUTES
	//bikin route get untuk url yang akses /cards
	router.get('/', (req, res) => {
 		let totalCards= cards.length;	//hitung banyak data di object cards
 		let randomId = Math.floor(Math.random() * totalCards);	//generate angka acak dari 0 sampai banyaknya data di object cards

 		//redirect ke url /cards/id?side=soal --> dengan nilai id random
 		res.redirect(`/cards/${randomId}?side=soal`);
 	})
	
	
	//bikin route get untuk url yang akses /cards dengan id --> misal : /cards/2
	router.get('/:id', (req, res) => {
		//res.locals.variabel = "Aku adalah siapa?";
		//res.locals.hint = "Kamu pernah ketemu";
		
		const { id } = req.params;		//baca id dari url
		const { side } = req.query;		//baca url setelah symbol ? --> misal /cards/2?side=jawaban

		//kenapa [side] --> karena dia bertipe string
		const text = cards[id][side];	//akses cards dengan id dan sidenya jawaban atau soal
		const { hint } = cards[id];		//ambil hint dari object cards dengan id yang dipilih
		//sama dengan
		//const { inihintnya: hint } = cards[id];

		//bikin object default bernama "templateData" dengan isi id, text dan hint
		let templateData = { id, text, hint };


		if(side=="jawaban"){
			//jika query side isinya "jawaban", maka templateData diganti supaya isinya hanya id & text, tanpa hint
			templateData = { id, text };

			//set value untuk variable "sidenya" & sideToDisplay,
			// yang dideklarasi di file cards.pug --> a(href=`/cards/${id}?side=${sidenya}`) #{SideToDisplay}
			templateData.sidenya = "soal";	
			templateData.SideToDisplay = "Lihat Soal";

		}else if(side=="soal"){
			//jika query side isinya "soal", maka set nya beda
			//set value untuk variable "sidenya" & sideToDisplay,
			// yang dideklarasi di file cards.pug --> a(href=`/cards/${id}?side=${sidenya}`) #{SideToDisplay}
			templateData.sidenya = "jawaban";
			templateData.SideToDisplay = "Lihat Jawaban";

		}else if(!side){
			//jika query sidenya tidak didefinisikan, maka otomatis di redirect ke /cards/id dengan side="soal"
			res.redirect(`/cards/${id}?side=soal`);
		}

		//console.log(`${id} -- ${side} -- ${text}`);


		//shorthand:
		res.locals = templateData;	//set locals dengan isi object templateData
		//res.locals = {text, hint};
		/*res.locals = {
			text : text,
			hint : hint
		};*/

		/*res.locals = {
			soal  	: cards[req.params.id].soal,
			hint 	: cards[req.params.id].hint, 
			jawaban	: cards[req.params.id].jawaban
		};*/

		//console.dir(data);

		//tampilkan halaman website cards.pug
		res.render("cards");
	});


//export router yang telah dibuat diatas, untuk digunakan oleh file lain yang melakukan require ke file ini 
module.exports = router;