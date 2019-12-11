const mongoose = require('mongoose')

const Schema = mongoose.Schema

// 轮播图组件
mongoose.connect("mongodb://localhost/test",{useNewUrlParser:true})

var list = new Schema({
  swiperA:{
    type:Array,
    required:true
  }
})

module.exports = mongoose.model('swiperMi',list)


