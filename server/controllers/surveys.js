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
    let newSurvey = Surveys({
        "surveysName" : req.body.surveysName,
        "questionOne"  : req.body.questionOne,
        "q1optionOne" : req.body.q1optionOne,
        "q1optionTwo" : req.body.q1optionTwo,
        "questionTwo"  : req.body.questionTwo,
        "q2optionOne" : req.body.q2optionOne,
        "q2optionTwo" : req.body.q2optionTwo,
        "questionThree"  : req.body.questionThree,
        "q3optionOne" : req.body.q3optionOne,
        "q3optionTwo" : req.body.q3optionTwo,
        "questionFour"  : req.body.questionFour,
        "q4optionOne" : req.body.q4optionOne,
        "q4optionTwo" : req.body.q4optionTwo,
        "questionFive"  : req.body.questionFive,
        "q5optionOne" : req.body.q5optionOne,
        "q5optionTwo" : req.body.q5optionTwo
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
              surveys: surveyToEdit,
               displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedSurvey = Surveys({
        "_id": id,
        "surveysName" : req.body.surveysName,
        "questionOne"  : req.body.questionOne,
        "q1optionOne" : req.body.q1optionOne,
        "q1optionTwo" : req.body.q1optionTwo,
        "questionTwo"  : req.body.questionTwo,
        "q2optionOne" : req.body.q2optionOne,
        "q2optionTwo" : req.body.q2optionTwo,
        "questionThree"  : req.body.questionThree,
        "q3optionOne" : req.body.q3optionOne,
        "q3optionTwo" : req.body.q3optionTwo,
        "questionFour"  : req.body.questionFour,
        "q4optionOne" : req.body.q4optionOne,
        "q4optionTwo" : req.body.q4optionTwo,
        "questionFive"  : req.body.questionFive,
        "q5optionOne" : req.body.q5optionOne,
        "q5optionTwo" : req.body.q5optionTwo
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


