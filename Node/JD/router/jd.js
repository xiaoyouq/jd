const express = require('express')

const router = express.Router()

const parseString = require('xml2js').parseString;

const swiper1 = require('../../JD/database/swiepr.js')

const iphone = require('../database/iphoneUser.js')

const request = require('request')

const jdnb = require('../../JD/database/nbDian.js')

router.get('/jbjbjb',(req,rep)=>{
  jdnb.find((error,data)=>{
    rep.status(200).json({data:data})
  })
})

router.post('/getGoodsCollections', (req, rep) => {
  jdnb.findOne({ iphone: req.body.useri }, (error, data) => {
    var c = data.goodsCollections.find(ele => {
      return ele.utitle == req.body.utitle
    })
    rep.status(200).json({ data:c })
  })
})

router.post('/newnb',(req,rep)=>{
  new jdnb({iphone:req.body.iphone}).save((error,data)=>{
      rep.status(200).json({data:data})
  })
})


// 请求手机号登录 
router.get('/iphones', (req, rep) => {
  var iphones = req.query.iphones
  iphone.findOne({ iphone: iphones }, (error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, success: '服务器服务失败' })
    }

    if (data) {
      return rep.status(200).json({ error_code: 200, success: '可以直接登录' })
    }

    rep.status(201).json({ error_code: 201, success: '是否直接注册' })
  })
})

router.post('/resgIphone', (req, rep) => {
  new iphone({ iphone: req.body.iphone, password: req.body.password }).save((error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, test: '服务端错误' })
    }
    rep.status(200).json({ error_code:200, test: '添加成功' ,data:data})

  })
})


// 获取验证码 
router.get('/iphoneCode', (req, rep) => {
  var iphones =req.query.iphone
  var c = Math.random() * 1000000
  var b = parseInt(c)
  var url = encodeURI("http://106.ihuyi.com/webservice/sms.php?method=Submit&account=C91113648&password=4dc6b14db4f43ad298478355fe5104a2&mobile=" + iphones + "&content=	您的验证码是：" + b + "。请不要把验证码泄露给其他人。")
  request(url, function (error, response, body) {
    parseString(body, (error, result) => {
      rep.status(200).json({ data: b,data1:result })
    })
  })
})

router.get('/getSwiper', (req, rep) => {
  swiper1.findOne({ title: req.query.title }, (error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: '服务端错误' })
    }

    if (data) {
      return rep.status(200).json({ code: 200, eror_code: '成功', data: data })
    }

    rep.status(200).json({ eror_code: '没有找到', code: 444 })

  })
})

router.get('/swipers', (req, rep) => {
  swiper1.find((error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: '添加失败' })
    }
    rep.status(200).json({ eror_code: 200, data: data })

  })
})

router.post('/updataSwiper', (req, rep) => {
  swiper1.findOne({ title: req.body.title }, (error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: '服务端渲染错误' })
    }

    if (data) {
      data.swiperList = req.body.swiperList
      new swiper1(data).save((error, data) => {
        if (error) {
          return rep.status(500).json({ error_code: '服务端渲染错误' })
        }
        return rep.status(200).json({ code: 202, error_code: '修改成功', data: data })
      })
    } else {
      rep.status(200).json({ code: 202, error_code: '没有找到', })
    }


  })
})

router.post('/pushSwiper', (req, rep) => {
  var body = req.body
  swiper1.findOne({ title: body.title }, (error1, data2) => {
    if (error1) {
      return rep.status(500).json({ error_code: '服务端渲染错误' })
    }


    if (data2) {
      return rep.status(200).json({ code: 203, error_code: '已经检测到重复', data: data2 })
    }

    new swiper1(body).save((error3, data3) => {
      if (error3) {
        return rep.status(500).json({ error_code: '添加失败' })
      }
      rep.status(200).json({ code: 201, error_code: '新的添加成功2', data: data3 })
    })


  })
})


// 账号密码登录 
router.post('/zhmmLogin',(req,rep)=>{
  iphone.findOne({iphone:req.body.iphone},(error,data)=>{
      if(error){
        return rep.status(500).json({ error_code: '添加失败' })
      }

      if(!data){
       return rep.status(200).json({ error_code: 200,success: '没找到' })
      }

      if(req.body.iphone == data.iphone && req.body.password ==data.password){
        rep.status(200).json({ code: 201, error_code: '找到了', data: data })
        return
      }else{
        rep.status(203).json({ code: 203, error_code: '账号或密码错误', data: data })
        return
      }
  })
})

// 差找个人信息等 
router.get('/getUserinFo1',(req,rep)=>{
  iphone.findOne({iphone:req.query.iphone},(error,data)=>{
      if(error){
        return rep.status(500).json({ error_code: '添加失败' })
      }

      rep.status(200).json({error_code:'添加成功',data:data})
  })
})




module.exports = router