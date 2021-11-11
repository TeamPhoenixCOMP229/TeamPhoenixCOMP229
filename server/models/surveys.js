let mongoose = require('mongoose');

//create a model class
let surveysModel = mongoose.Schema({
    surveysName: String, 
    questionOne: String,
    questionTwo: String,
    questionThree: String,
    questionFour: String,
    questionFive: String,
},
{
    collection: "survey"
});

module.exports = mongoose.model('Surveys', surveysModel);
