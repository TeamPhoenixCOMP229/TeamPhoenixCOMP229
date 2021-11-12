//Kokila Sangilimuthu (Project Manager)- 301151291  
//Morris Zuniga (Lead Software Engineer)- 822704615  
//Ece Irem Burgaz (Web Designer) - 301162609  
//RahulKumar Jiskeshbhai Makwana (UI Programmer) - 301183901  
//Guillermo Garcia Romero - (Database Programmer) 301130333  
//Orlino Pacioles Jr (Generalist Programmer)- 301216444
//Survey Site routes


let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let surveysController = require('../controllers/surveys');



// connect to our Survey Model
let Surveys = require('../models/surveys');


/* GET Route for the Survey List page - READ Operation */
router.get('/', surveysController.displaySurveysList);

/* GET Route for displaying Add page - CREATE Operation */
router.get('/add',  surveysController.displayAddPage );

/* POST Route for processing Add page - CREATE Operation */
router.post('/add', surveysController.processAddPage );

/* GET Route for displaying Edit page - UPDATE Operation */
router.get('/edit/:id',  surveysController.displayEditPage);

/* POST Route for processing Edit page - UPDATE Operation */
router.post('/edit/:id',  surveysController.processEditPage);

/* GETto perform Deletion - DELETE Operation */
router.get('/delete/:id',  surveysController.performDelete );

module.exports = router;