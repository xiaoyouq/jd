const express = require('express')

const router = express.Router()

const User = require('../database/user')

const listcar = require('../database/listcar.js')

const md5 = require('blueimp-md5')

// router.get('/logout',(req,rep)=>{
//   req.session.destroy()
// })

router.get('/userinfo',(req,rep)=>{
  rep.status(200).json({ error: 200,session:req.session.datas})
})

router.get('/userinfoget',(req,rep)=>{
  User.find((error,data)=>{
      if(error){
         return rep.status(500).json({ error_code: 500, success: '服务端错误', datas: body })
      }
         rep.status(200).json({ error_code: 200, success: '请求成功', datas: data })
  })
})

// 请求主页
router.get('/user', (req, rep) => {
  // console.log(req.query)
  rep.status(200).json({ error: 200, success: '访问成功/user',session:req.session.session_id})
})

// 用户注册 
router.post('/register', (req, rep) => {
  // 手到请求后 先查看 是否能够看到数据  第二步 再查看数据库中有无重复的 重复的也不行 如果 没有的则添加进去
  var body = req.body
  User.find((error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, success: '服务端错误', datas: body })
    }

    var newData = data.find(function (item) {
      return item.account == body.account || item.name == body.name
    })

    if (newData) {
      return rep.status(200).json({ error_code: 201, success: '账号或者昵称重复!' })
    } else {
      // 给密码双重加密 确保安全性能
      body.password = md5(md5(body.password) + 'itcast')
      new User(body).save((error1, data1) => {
        if (error1) {
          return rep.status(500).json({ error_code: 501, success: '账号或者昵称重复!' })
        }
        req.session.session_id = data1._id
        req.session.datas=data1
        rep.status(200).json({ error_code: 200, success: '注册成功!', datas: data1 })
      })
    }
  })
})


// 用户登录
router.get('/login', (req, rep) => {
  var body = req.query
  User.find((error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, success: '服务端渲染错误Error', datas: body })
    }
    body.password = md5(md5(body.password) + 'itcast')
    var successCode = data.find(function (item) {
      return item.account == body.account && item.password == body.password
    })
    if (!successCode) {
      return rep.status(201).json({ error_code: 201, success: '账号或者密码输入错误！', datas: body })
    }
    req.session.session_id = successCode._id
    User.findOne({account:body.account},function(error,data) {
        if(error){
          return rep.status(500).json({ error_code: 500, success: '服务端渲染错误Error', datas: body })
        }
        req.session.datas = data
        rep.status(200).json({ error_code: 200, success: '登录成功', datas: data })
    })
  })
})



module.exports = router
