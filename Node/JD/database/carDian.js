const mongoose =require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true})

var list = new Schema({
  name:{
    type:String,
    required:true
  },
  people:{
    type:Array,
    default:[]
  },
  // username:{
  //   type:String,
  //   required:true
  // },
  // iphone:{
  //   type:String,
  //   default:'1'
  // }
})

module.exports = mongoose.model('carDian',list)