//Kokila Sangilimuthu (Project Manager)- 301151291  
//Morris Zuniga (Lead Software Engineer)- 822704615  
//Ece Irem Burgaz (Web Designer) - 301162609  
//RahulKumar Jiskeshbhai Makwana (UI Programmer) - 301183901  
//Guillermo Garcia Romero - (Database Programmer) 301130333  
//Orlino Pacioles Jr (Generalist Programmer)- 301216444
//Survey Site URI link to MongoDB Atlas


let express = require('express');
let router = express.Router();
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let Surveys = require('../models/surveys');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    //res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
    Surveys.find((err, surveysList)=> {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('index',
             {title: 'Home',
              SurveysList: surveysList,
              displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.displaySurveysPage = (req, res, next) => {
    res.render('index', { title: 'Surveys', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
           title: "Login",
           messages: req.flash('loginMessage'),
           displayName: req.user ? req.user.displayName : '' 
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }
            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });
            /* TODO - Getting Ready to convert to API
            res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});
            */

            return res.redirect('/surveys-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            console.log(err)
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }

            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            // if no error exists, then registration is successful

            // redirect the user and authenticate them
           /* TODO - Getting Ready to convert to API
            res.json({success: true, msg: 'User Registered Successfully!'});
            */

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/surveys-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
module.exports.surveyDisplayPage =  (req, res, next) => {
    let id = req.params.id;

    Surveys.findById(id, (err, surveyToDisplay) => {
        if(err)
        {
             console.log(err);
             res.end(err);
        }
        else
        {
            //show the edit view
            res.render('surveydisplay',
             {title: 'Survey',
              survey: surveyToDisplay,
               displayName: req.user ? req.user.displayName : ''});
        }
    });
}
module.exports.processSurveyDisplayPage = (req, res, next) => {
    let id = req.params.id;

    // Get answer survey from database
    Surveys.findById(id, (err, surveyToUpdate) => {
        if(err)
        {
             console.log(err);
             res.end(err);
        }
        else
        {
            let keys = Object.keys(req.body)
            for (let i = 0; i < surveyToUpdate.questions.length; i++) {
                let selectedOptionTitle = req.body[keys[i]]
                for (let j = 0; j < surveyToUpdate.questions[i].options.length; j++) {
                    if (selectedOptionTitle == surveyToUpdate.questions[i].options[j].title) {
                        // Increase count according to answers
                        surveyToUpdate.questions[i].options[j].count++ 
                    }
                }
            }

            // Update survey
            Surveys.updateOne({_id: id}, surveyToUpdate, (err) => {
                if(err)
                {
                     console.log(err);
                     res.end(err);
                }
                else
                {
                    //refresh the survey list
                    res.redirect('/home');
                }
            });
        }
    });
}

