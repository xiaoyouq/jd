const express = require('express')

const router = express.Router()

const nbd = require('../database/nbDian.js')

router.get('/sc',(req,rep)=>{
    rep.status(200).json({name:'李四'})
})

router.post('/newnb',(req,rep)=>{
  new nbd({iphone:req.body.iphone}).save((error,data)=>{
      rep.status(200).json({data:data})
  })
})

router.get('/getnb',(req,rep)=>{
  nbd.find((error,data)=>{
    rep.status(200).json({data:data})
  })
})

router.post('/getGoodsCollections', (req, rep) => {
  nbd.findOne({ iphone: req.body.useri }, (error, data) => {
    // console.log(data.goodsCollections)
    // var c = data.goodsCollections.find(ele => {
    //   return ele.utitle == req.body.utitle
    // })
    rep.status(200).json({ data:data })
  })
})

module.exports = router
