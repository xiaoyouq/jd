const express = require('express')

const router = express.Router()

const User = require('../database/user')

const listcar = require('../database/listcar.js')

const md5 = require('blueimp-md5')


router.get('/djms',(req,rep)=>{
  listcar.find({sort:req.query.title},(error,data)=>{
      if(error){
          return rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
      }
      
      if(data){
        return  rep.status(200).json({error_code:200,success:'找到对应的了',data:data})
      }else{
        return  rep.status(201).json({error_code:201,success:'查找错误',data:data})
      }


  })
})


// 个人喜欢

router.get('/memory', (req, rep) => {
  console.log()
  var body = req.query
  User.findOne({account:body.account},(error,data)=>{
    if(error){
      return rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
    }
    data.memory = body.memory
   data.nomemory = body.nomemory
    new User(data).save((error,data)=>{
      if(error){
        return rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
      }
      rep.status(200).json({error_code:200,success:'成功',data:data})
    })
  })
})

// 修改密码
router.get('/xgmmuser', (req, rep) => {
  var body = req.query
  User.findOne({ account: body.account }, (error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
    }
    body.jmm = md5(md5(body.jmm) + 'itcast')

    if (data.password == body.jmm) {
      return rep.status(200).json({ error_code: 201, success: '和原密码一样' })
    } else {
      return rep.status(200).json({ error_code: 200, success: '和原密码不一样' })
    }
  })
})

router.get('/xgmmusers', (req, rep) => {
  var body = req.query
  User.findOne({ account: body.account }, (error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
    }
    data.password = md5(md5(body.newpassword) + 'itcast')
    new User(data).save((error, data) => {
      if (error) {
        return rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
      }
      rep.status(200).json({ error_code: 200, success: '修改密码', data: data })
    })
  })
})


// 修改资料

router.post('/modified', (req, rep) => {
  var body = req.body
  User.findOne({ account: req.body.account }, (error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
    }
    data.username = body.username
    data.gender = body.gender,
      data.age = body.age
    data.birthday = body.birthday
    data.lovetodo = body.lovetodo
    data.photo = body.photo
    new User(data).save((error, data) => {
      if (error) {
        return rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
      }
      rep.status(200).json({ error_code: 200, success: '修改成功', data: data })
    })
  })
})

// 完善资料
router.get('/wszluser', (req, rep) => {
  User.findOne({ account: req.query.name }, (error, data) => {
    if (error) {
      rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
    }

    data.birthday = req.query.b
    new User(data).save((error, data) => {
      if (error) {
        rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
      }

      rep.status(200).json({ error_code: 200, success: '修改成功', data: data })
    })
  })
})

router.get('/logout', (req, rep) => {
  User.findOne({ account: req.query.account }, (error, data) => {
    data.end_time = req.query.time
    new User(data).save((error, data) => {
      if (error) {
        rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
      }
      rep.status(200).json({ error_code: 200, success: 'ok', data: data })
      req.session.destroy()
    })
  })
})

// 访问列表
router.get('/newList', (req, rep) => {
  // rep.header("cache-control", "no-store");
  listcar.find((error, data) => {
    if (error) {
      rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
    }
    rep.status(200).json({ error_code: 200, success: '访问商品列表成功', data: data })
  })
})

// 访问增加商品成功
router.post('/pushCarList', (req, rep) => {
  var body = req.body
  listcar.findOne({ utitle: req.body.utitle }, (error, data) => {
    if (error) {
      rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
    }

    if (data) {
      rep.status(200).json({ error_code: 500, success: '商品名字不能有重复' })
    }
    new listcar(body).save((error, data) => {
      if (error) {
        rep.status(200).json({ error_code: 500, success: '添加失败 over' })
      }
      console.log(data)
      rep.status(200).json({ error_code: 2002, success: '添加成功 over', data: data })
    })
  })
})

// 访问商品分类列表
router.get('/sortList', (req, rep) => {
  rep.status(200).json({ error_code: 200, success: '访问商品分类成功' })
})

// 访问商品分类增加列表
router.get('/pushSortList', (req, rep) => {
  rep.status(200).json({ error_code: 200, success: '访问商品分类增加列表成功' })
})

router.post('/prc', (req, rep) => {
  rep.status(200).json({ error_code: 200, success: '添加图片成功', data: req.body })
})


// 删除列表 找到对应的然后删除 
router.get('/sortdelete', (req, rep) => {
  listcar.findByIdAndRemove(req.query.uid, (error, data) => {
    if (error) {
      rep.status(500).json({ error_code: 500, success: '删除失败' })
    }
    rep.status(200).json({ error_code: 200, success: '删除成功' })
  })
})



module.exports = router