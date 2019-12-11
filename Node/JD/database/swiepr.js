
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true})

var list =  new Schema({
    swiperList:{
      type:Array
    },
    title:{
      type:String,
      required:true
    }
})

module.exports = mongoose.model('jdSwiper',list)