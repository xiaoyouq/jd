const mongoose = require('mongoose')

const Schame = mongoose.Schema

var moment = require('moment');

mongoose.connect('mongodb://localhost/test',{useNewUrlParser:false})

var list = new Schame({
    sort:{
      type:String,
      required:true,
      default:'综合'
    },
    utitle:{
      type:String,
      required:true
    },
    content:{
      type:String,
      required:true
    },
    preice:{
      type:Number,
      required:true
    },
    ratepreice:{
      type:Number,
      required:true
    },
    repertory:{
      type:Number,
      default:999,
    },
    picture:{
      type:Array,
    },
    picture1:{
      type:Array,
    },
    count:{
      type:Number,
      default:1
    },
    create_time:{
      type:String,
      default:moment
    }
})  

module.exports = mongoose.model('newlistcar',list)