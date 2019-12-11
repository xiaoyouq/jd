const express = require('express')

const router = express.Router()

const swiper = require('../MiRouter/swiper.js') 

router.get('/swiper',(req,rep)=>{
    rep.status(200).json({error_code:200,success:'访问轮播图组件成功'})
})

module.exports = router