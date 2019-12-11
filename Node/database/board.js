const mongoose = require('mongoose')
const Schame = mongoose.Schema
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })

var list = new Schame({
  username: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    require: true,
  },
  content1: {
    type: String,
  },
  content2: {
    type: String,
  },
  content3: {
    type: String,
  },
  content4: {
    type: String,
  },
  content5: {
    type: String,
  },
  photo: {
    type: String,
    // required: true,
  },
  like: {
    type: Number,
    default: 0
  },
  message: {
    type: Number,
    default: 0
  },
  photos: {
    type: Array,
  },
  dzg:{
    type:Array,
    default:['李奔']
  },
  created_time:{
    type:Number,
    default:Date.now
  }
})

module.exports = mongoose.model('board', list)
// 1 留言板留言问题
// 建一个表格 
// 表格以标题为索引  
// 每次加载评论的时候 找到这个评论的标题为索引 然后加载
//  搜索的时候 如果有的话 则继续往留言板里面push
// 如果没有的话 则new 一个评论列表 并且push进去
