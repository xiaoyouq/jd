const express = require('express')

const router = express.Router()

const board = require('../database/board.js')

const request = require('request')

const parseString = require('xml2js').parseString;


router.get('/newListboard', (req, rep) => {
  board.find((error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, success: '服务器渲染失败', })
    }
    rep.status(200).json({ error_code: 200, success: '访问成功', data: data })

  })
})

router.post('/board', (req, rep) => {
  var body = req.body
  board.findOne({ title: body.title }, (error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, success: '服务器渲染失败', })
    }

    if (data) {
      return rep.status(200).json({ error_code: 201, success: '已经存在了' })
    }

    // return rep.status(200).json({ error_code: 201, success: 'ok',data:data})
    new board(body).save((error1, data1) => {
      if (error1) {
        return rep.status(500).json({ error_code: 500, success: '服务器渲染失败', })
      }
      rep.status(200).json({ error_code: 200, success: '添加成功', data: data1 })
    })

  })
})

module.exports = router