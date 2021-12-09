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

let jwt = require('jsonwebtoken');

let passport = require('passport');

let surveysController = require('../controllers/surveys');

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated()) 
    {
        return res.redirect('/login')
    }

    next()
}

// connect to our Survey Model
let Surveys = require('../models/surveys');


/* GET Route for the Survey List page - READ Operation */
router.get('/', surveysController.displaySurveysList);

/* GET Route for displaying Add page - CREATE Operation */
router.get('/add', requireAuth, surveysController.displayAddPage );

/* POST Route for processing Add page - CREATE Operation */
router.post('/add', requireAuth, surveysController.processAddPage );

/* GET Route for displaying Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth,  surveysController.displayEditPage);

/* POST Route for processing Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth,  surveysController.processEditPage);

/* GETto perform Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth,  surveysController.performDelete );

/* GET Route for displaying Statistics page*/
router.get('/statistics/:id', requireAuth, surveysController.displayStatisticsPage );

module.exports = router;