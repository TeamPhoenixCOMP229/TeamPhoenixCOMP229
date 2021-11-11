let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Surveys = require('../models/surveys');

module.exports.displaySurveysList = (_req, res, _next) => {
    Surveys.find((err, surveysList)=> {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            
            res.render('surveys/list', {title: 'Surveys', SurveysList: surveysList})
        }
    });
}

module.exports.displayAddPage =  (req, res, next) => {
    res.render('surveys/add', {title: 'Add Survey'})
}

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Surveys({
        "surveysName" : req.body.surveysName,
        "questionOne"  : req.body.questionOne,
        "questionTwo"  : req.body.questionTwo,
        "questionThree"  : req.body.questionThree,
        "questionFour"  : req.body.questionFour,
        "questionFive"  : req.body.questionFive
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
            res.render('surveys/edit', {title: 'Edit Survey', surveys: surveyToEdit});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedSurvey = Surveys({
        "_id": id,
        "surveysName" : req.body.surveysName,
        "questionOne"  : req.body.questionOne,
        "questionTwo"  : req.body.questionTwo,
        "questionThree"  : req.body.questionThree,
        "questionFour"  : req.body.questionFour,
        "questionFive"  : req.body.questionFive
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


