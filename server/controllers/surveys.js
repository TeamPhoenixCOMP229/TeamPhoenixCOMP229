//Kokila Sangilimuthu (Project Manager)- 301151291  
//Morris Zuniga (Lead Software Engineer)- 822704615  
//Ece Irem Burgaz (Web Designer) - 301162609  
//RahulKumar Jiskeshbhai Makwana (UI Programmer) - 301183901  
//Guillermo Garcia Romero - (Database Programmer) 301130333  
//Orlino Pacioles Jr (Generalist Programmer)- 301216444
//Survey Site URI link to MongoDB Atlas


let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Surveys = require('../models/surveys');

module.exports.displaySurveysList = (req, res, _next) => {
    Surveys.find((err, surveysList)=> {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('surveys/list',
             {title: 'Surveys',
              SurveysList: surveysList,
              displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.displayAddPage =  (req, res, next) => {
    res.render('surveys/add',
     {title: 'Add Survey',
      displayName: req.user ? req.user.displayName : ''})
}

module.exports.processAddPage = (req, res, next) => {
    let questionsTitles = [
        req.body.questionOne,
        req.body.questionTwo,
        req.body.questionThree,
        req.body.questionFour,
        req.body.questionFive,
        req.body.questionSix,
        req.body.questionSeven,
        req.body.questionEight,
        req.body.questionNine,
        req.body.questionTen

    ]

    let questions = []

    for (let i = 0; i < questionsTitles.length; i++) {
        questions.push({
            "title" : questionsTitles[i],
            "options" : BinaryQuestionOptions
        })
    }

    let activationDate = new Date(req.body.activationDate)
    let expirationDate = new Date(req.body.expirationDate)
    // Increase the date by one, so the survey expires at the end of the day
    expirationDate.setDate(expirationDate.getDate() + 1)

    let newSurvey = Surveys({
        "surveyName" : req.body.surveysName,
        "username":req.body.userName, 
        "questions" : questions,
        "activationDate" : activationDate,
        "expirationDate"  : expirationDate
    });
    Surveys.create(newSurvey, (err, Surveys) =>{
        if(err)
        {
             console.log(err);
             res.end(err);
        }
        else
        {
            //refresh the survey list
            res.redirect('/surveys-list');
        }
    });
}

module.exports.displayEditPage =  (req, res, next) => {
    let id = req.params.id;

    Surveys.findById(id, (err, surveyToEdit) => {
        if(err)
        {
             console.log(err);
             res.end(err);
        }
        else
        {
            //show the edit view
            res.render('surveys/edit',
             {title: 'Edit Survey',
              survey: surveyToEdit,
               displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let questionsTitles = req.body.questionsTitles
    let questions = []

    for (let i = 0; i < questionsTitles.length; i++) {
        questions.push({
            "title" : questionsTitles[i],
            "options" : BinaryQuestionOptions
        })
    }

    let activationDate = new Date(req.body.activationDate)
    let expirationDate = new Date(req.body.expirationDate)
    // Increase the date by one, so the survey expires at the end of the day
    expirationDate.setDate(expirationDate.getDate() + 1)

    let updatedSurvey = Surveys({
        "_id": id,
        "surveyName" : req.body.surveyName,
        "questions" : questions,
        "activationDate" : activationDate,
        "expirationDate"  : expirationDate
    });
    Surveys.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
             console.log(err);
             res.end(err);
        }
        else
        {
            //refresh the survey list
            res.redirect('/surveys-list');
        }
    });
}


module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Surveys.remove({_id: id}, (err) => {
        if(err)
        {
             console.log(err);
             res.end(err);
        }
        else
        {
            //refresh the survey list
            res.redirect('/surveys-list');
        }
    });
}

module.exports.displayStatisticsPage =  (req, res, next) => {
    let id = req.params.id;

    Surveys.findById(id, (err, surveyToShow) => {
        if(err)
        {
             console.log(err);
             res.end(err);
        }
        else
        {

            //show the statistics view
            res.render('surveys/statistics',
             {title: 'Statistics',
             survey: surveyToShow,
               displayName: req.user ? req.user.displayName : ''});
        }
    });
}


const BinaryQuestionTrueTitle = "Agree"
const BinaryQuestionFalseTitle = "Disagree"
const BinaryQuestionOptions = [
    {
        "title": BinaryQuestionTrueTitle
    },
    {
        "title": BinaryQuestionFalseTitle
    },
]