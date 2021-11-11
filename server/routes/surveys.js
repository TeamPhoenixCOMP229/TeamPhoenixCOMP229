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