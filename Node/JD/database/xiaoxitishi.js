const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true})

const list = new Schema({ 
  iphone:{ //手机号 
    type:String,
    required:true
  },
  create_time:{ // 发送时候的时间 根据时间判断多长时间以前的 
    type:Number,
    default:Date.now()
  },
  title1:{ //标题 
    type:String,
    required:true
  },
  title2:{ //内容 
    type:String,
    required:true
  },
  sort:{
    type:String,
    required:true
  },
  tx:{
    type:Number,
    default:1
  },
  lt:{
    type:Array,
    default:[]
  },
  data:{
    type:Object,
    default:{}
  }
})

module.exports = mongoose.model('xiaoxitishi',list)