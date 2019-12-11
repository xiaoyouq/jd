const express = require('express')

const router = express.Router()

const classify = require('../database/classify.js')

router.post('/classifydelete', (req, rep) => {
  var body = req.body
  classify.findOne({ sort: body.sort }, (error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, success: '服务端渲染错误'})
    }

    if(!data){
      return  rep.status(200).json({ error_code: 201, success: '没有找到'})
    } 
    
    classify.remove({sort:body.sort},(error,data)=>{
      if(error){
        return rep.status(500).json({ error_code: 500, success: '服务端渲染错误'})
      }

      rep.status(200).json({ error_code: 202, success: '删除成功', data: data })
    })

    
  })
})

// 获取分类列表
router.get('/classifyfind', (req, rep) => {
  classify.find((error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
    }
    rep.status(200).json({ error_code: 200, success: '请求成功', data: data })
  })
})

router.post("/classify", (req, rep) => {
  var body = req.body

  classify.findOne({ sort: body.sort }, (error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, success: '服务端渲染错误' })
    }

    if (data) {
      return rep.status(200).json({ error_code: 200, success: '有重名' })
    }

    new classify(body).save((error, data) => {
      if (error) {
        return rep.status(500).json({ error_code: 500, success: '添加失败', })
      }

      rep.status(200).json({ error_code: 202, success: '添加成功！', data: data })
    })
  })


})

module.exports = router