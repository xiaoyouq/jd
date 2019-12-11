const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true})

const list = new Schema({
  iphone:{ //查询时用到的手机号
    type:Number,
    required:true
  },
  sort:{ //商家店铺名字
    type:String,
    required:true
  },
  created_time:{//聊天创建时间
    type:String,  
    default:Date.now
  },
  created_time1:{
      type:Number,  
      default:Date.now
  },
  lt:{//聊天内容 以对象的形式储存聊天消息
    type:Array,
    default:[]
  },
  username:{
    type:String,
    required:true
  },
  data:{
    type:Object,
  },
  num:{
    type:Number,
    default:0
  }
})
module.exports = mongoose.model('lt',list)