const mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true})

const User = new Schema({
  account:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  name:{
    type:String,
    default:'黑旋风李逵'
  },
  username:{
    type:String,
    default:'酷酷的滕'
  },
  gender:{
    type:String,
    enum:['男','女'],
    default:'男'
  },
  created_time:{
    type:String,
    default:Date.now
  },
  photo:{
    type:'String',
    default:'/public/image/headerimg.jpg'
  },
  age:{
    type:Number,
    default:18
  },
  end_time:{
    type:String
  },
  birthday:{
    type:String,
  },
  lovetodo:{
    type:Array,
    default:['暂无']
  },
  nomemory:{
    type:Array,
  },
  memory:{
    type:Array,
   },
})

module.exports = mongoose.model('newht',User)