const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })

var list = new Schema({
  iphone: {
    type: String,
    required: true
  },
  // 搜索缓存
  search: {
    type: Array,
    default: []
  },
  // 商品收藏
  goodsCollections: {
    type: Array,
    default: []
  },
  // 我的足迹
  footprint: {
    type: Array,
    default: []
  },
  // 购物车
  obligation: {
    type: Array,
    default: []
  },
  // 待收货
  receiving: {
    type: Array,
    default: []
  },
  // 已完成
  stocks: {
    type: Array,
    default: []
  },
  // 待付款
  dfk:{
    type:Array,
    default:[]
  }
})

module.exports = mongoose.model('yhsc', list)
