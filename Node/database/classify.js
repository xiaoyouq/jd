const mongoose = require('mongoose')

const Schema = mongoose.Schema

var moment = require('moment');

mongoose.connect('mongodb://localhost/test',{useNewUrlParser:false})


var user = new Schema({
  sort:{
    type:String,
    required:true,
  },
  create_time:{
    type:Number,
    default:moment
  },
  username:{
    type:String,
  }
})

module.exports = mongoose.model('newclassify',user)