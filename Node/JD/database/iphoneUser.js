const mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true })
function randomRange(min, max, charStr) {
  var returnStr = "",
    range;
  if (typeof max == 'string') {
    charStr = max;
  }
  range = ((max && typeof max == 'number') ? Math.round(Math.random() * (max - min)) + min : min);
  charStr = charStr || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < range; i++) {
    var index = Math.round(Math.random() * (charStr.length - 1));
    returnStr += charStr.substring(index, index + 1);
  }
  return returnStr;
}
var list = new Schema({
  // 手机号
  iphone: {
    type: Number,
    default: ''
    // required:true
  },
  password: {
    type: String,
  },
  // 姓名
  username: {
    type: String,
    default: 'jd_' + randomRange(10, 24)
  },
  username1: {
    type: String,
    default: 'jd_' + randomRange(10, 36)
  },
  carCollect: {
    type: Array,
    default: []
  },
  shopCollect: {
    type: Array,
    default: []
  },
  gender: {
    type: String,
    enum: ['男', '女'],
    default: '男'
  },
  // 头像
  picture: {
    type: String,
    default: '1'
  },
  shouhuodizhi: {
    type: [],
    default: []
  },
  age: {
    type: Number,
    default: 18
  },
  created_time: {
    type: Number,
    default: Date.now
  },
  end_time: {
    type: Number
  },
  jxz: {
    type: Number,
    default: parseInt(Math.random() * 1000)
  },
  xbxy: {
    type: Number,
    default: parseInt(Math.random() * 100)
  },
  // 优惠券
  coupons: {
    type: Array,
    default: [{
      available: 1,
      condition: "无使用门槛\n最多优惠20元",
      reason: "",
      value: 150,
      name: "全场通用",
      startAt: 1573714433,
      endAt: 1605344033,
      valueDesc: 20,
      unitDesc: "元"
    }]
  },
  disabledCoupons: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('iphones', list)
