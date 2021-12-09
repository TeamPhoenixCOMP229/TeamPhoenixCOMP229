//Kokila Sangilimuthu (Project Manager)- 301151291  
//Morris Zuniga (Lead Software Engineer)- 822704615  
//Ece Irem Burgaz (Web Designer) - 301162609  
//RahulKumar Jiskeshbhai Makwana (UI Programmer) - 301183901  
//Guillermo Garcia Romero - (Database Programmer) 301130333  
//Orlino Pacioles Jr (Generalist Programmer)- 301216444
//Survey database model Schema


let mongoose = require('mongoose');

//create a model class
let surveysModel = mongoose.Schema({
    surveyName: {
        type: String,
        default: '',
        trim: true,
        required: 'surveysName is required'
    },
    username: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
    questions: [{
        title: String,
        options: [{
            title: {
                type: String,
                default: ''
            },
            count: {
                type: Number,
                default: 0
            }
        }]
    }
    ],
    activationDate: {
        type: Date,
        default: Date.now()
    },
    expirationDate: {
        type: Date,
        default: Date.now()
    }
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Surveys', surveysModel);
