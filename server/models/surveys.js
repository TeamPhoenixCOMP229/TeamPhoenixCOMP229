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
    surveysName: String, 
    questionOne: String,
    q1optionOne: String,
    q1optionTwo: String,
    questionTwo: String,
    q2optionOne: String,
    q2optionTwo: String,
    questionThree: String,
    q3optionOne: String,
    q3optionTwo: String,
    questionFour: String,
    q4optionOne: String,
    q4optionTwo: String,
    questionFive: String,
    q5optionOne: String,
    q5optionTwo: String,
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Surveys', surveysModel);
