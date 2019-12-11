const express = require('express')

const router = express.Router()

const discuss = require('../database/discuss.js')
const board = require('../database/board.js')
const user = require('../database/user.js')

// 这是获取评论列表
router.get('/dismessage',(req,rep)=>{ 
  console.log(req.query)
  discuss.find({title:req.query.utitle},(error,data)=>{
    if(error){
       return rep.status(500).json({error_code:500,success:'服务器！'})
    }

    if(!data){
      rep.status(200).json({error_code:207,success:'没找到这个'})
    }
    rep.status(200).json({error_code:201,success:'找到了',data:data})
    
  })
})

// 评论
router.post('/disussbtn',(req,rep)=>{
  var body = req.body
  new discuss(body).save((error,data)=>{
    if(error){
      return rep.status(500).json({error_code:500,success:'服务器！'})
    }
    rep.status(200).json({error_code:201,success:'成功',data:data})
  })
})


// 访问新闻详情 

router.post('/NewsDetails',(req,rep)=>{
  var query = req.body
  board.findOne({title:query.title},(error,data)=>{
    if(error){
     return rep.status(500).json({error_code:500,success:'没找到'})
    }

    data.message ++
    new board(data).save((error,data)=>{
        if(error){
         return rep.status(500).json({error_code:500,success:'没找到'})
        }
        
        rep.status(200).json({error_code:201,success:'找到了',data:data})
    })
  })
})



router.post('/discuss', (req, rep) => {
  var body = req.body
  rep.status(200).json({ error_code: 200, success: '成功' })
})

router.get('/discussdz', (req, rep) => {
  var query = req.query
  board.findOne({ title: req.query.title }, (error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, success: '失败' })
    }
    var b = false
    data.dzg.some(element => {
      if (element == query.account) {
        return b = true
      }
    });
    if (b == true) {
      var c = data.dzg.indexOf(query.account)
      data.dzg.splice(c, 1)
      new board(data).save((error, data) => {
        if (error) {
          return rep.status(500).json({ error_code: 500, success: '失败' })
        }
        return rep.status(200).json({ error_code: 204, success: '点赞过了', data: data.dzg })
      })
    } else if(b == false) { 
      data.dzg.push(query.account)
      new board(data).save((eroor, data) => {
        if (eroor) {
          return rep.status(500).json({ error_code: 500, success: '失败' })
        }
        rep.status(200).json({ error_code: 205, success: '可以点赞', data: data })
      })
    }
  })

})

module.exports = router