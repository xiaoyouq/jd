const express = require('express')
const router = express.Router()
const pl = require('../database/pinglunB.js')
const jdnb =  require('../database/nbDian.js')
const lt = require('../database/lt.js')
const lttx = require('../database/xiaoxitishi.js')
// 返回列表是 发送一个请求 然后 根据请求判断 请求当前时间的  
router.post('/ltTcQ',(req,rep)=>{
  lt.findOne({iphone:req.body.iphone,sort:req.body.sort},(error,data)=>{
    if(data.lt[data.lt.length-1].lk){
      // 判断是不是第一次离开  如何是第一次 
      var c= Date.now()
      data.lt[data.lt.length-1].create_time2 = c
      new lt(data).save((error,data)=>{
        rep.status(200).json({data:data})
        return
      })
    }else{
      //  如果是第一次 
      var d = { lk:true,create_time2:Date.now()}
      data.lt.push(d)
      new lt(data).save((error,data)=>{
        rep.status(200).json({data:data,success:'第一次成功了！'})
      })
    }
    
  })
})


// 第二次聊天 带上时间的 
router.post('/newItime',(req,rep)=>{
  lt.findOne({iphone:req.body.iphone,sort:req.body.sort},(error,data)=>{
    var d = { time:true,create_time1:Date.now()}
     data.lt.push(d)
     new lt(data).save((error,data)=>{
      rep.status(200).json({data:data,success:200})
    })
  })
})


// 服务端请求的地址
router.post('/ltPut123',(req,rep)=>{
  rep.header("cache-control", "no-store");
  lt.findOne({iphone:req.body.iphone,sort:req.body.sort},(error,data)=>{
    if(data){
      data.created_time1 = req.body.created_time1
        data.lt.push(req.body)
        data.num++
      new lt(data).save((error,data)=>{
        return rep.status(200).json({error:'访问成功',data:data})
      })
    }else{
        // { time: true, ctime: "11:35" },
         new lt(req.body).save((error,data)=>{
           setTimeout(() => { 
             var c = {time : true,ctime:Date.now()}
             data.lt.push(c)
             data.lt.push(req.body)
             data.created_time1 = req.body.created_time1
                new lt(data).save((error,data1)=>{
                  return rep.status(200).json({data:data1,success:'加载成功了'})
                })
           }, 500);
         })
    }
  })
})


// 客户端请求的值 
router.post('/ltPut',(req,rep)=>{
  rep.header("cache-control", "no-store");
  lt.findOne({iphone:req.body.iphone,sort:req.body.sort},(error,data)=>{
    if(data){
        data.lt.push(req.body)
        data.created_time1 = req.body.created_time1
      new lt(data).save((error,data)=>{
        return rep.status(200).json({error:'访问成功',data:data})
      })
    }else{
        // { time: true, ctime: "11:35" },
         new lt(req.body).save((error,data)=>{
           setTimeout(() => { 
             var c = {time : true,create_time1:Date.now()}
             data.lt.push(c)
             data.lt.push(req.body)
             data.created_time1 = req.body.created_time1
                  new lt(data).save((error,data1)=>{
                  return rep.status(200).json({data:data1,success:'加载成功了'})
                })
           }, 1000);
         })
    }
  })
})


// 聊天记录 
router.post('/listLt',(req,rep)=>{
  lt.findOne({iphone:req.body.iphone,sort:req.body.sort},(error,data)=>{
    rep.status(200).json({data:data,success:'成功喽'})
    })
})


// 客户端请求的地址
router.get('/lastIi',(req,rep)=>{
  rep.header("cache-control", "no-store");
  lt.find((error,data)=>{
    rep.status(200).json({data:data})
  })
})


// 服务端请求的地址
router.get('/lastIi123',(req,rep)=>{
  rep.header("cache-control", "no-store");
  lt.find({iphone:req.query.iphone},(error,data)=>{
    rep.status(200).json({data:data})
  })
})

router.get('/lastIi1234',(req,rep)=>{
  rep.header("cache-control", "no-store");
  lt.find((error,data)=>{
    rep.status(200).json({data:data})
  })
})

// 搜索历史 
router.post('/searchInputHC',(req,rep)=>{
  jdnb.findOne({iphone:req.body.iphone},(error,data)=>{
    data.search.unshift({title:req.body.message})
    new jdnb(data).save((error,data)=>{
      rep.status(200).json({data:data})
    })
  })
})


// 清空历记录 
router.post('/searchIn',(req,rep)=>{
  jdnb.findOne({iphone:req.body.iphone},(error,data)=>{
      data.search = []
      new jdnb(data).save((error,data)=>{
        rep.status(200).json({data:data})
      })
  })
})


router.get('/utitleConter',(req,rep)=>{
    pl.findOne({utitle:req.query.utitle},(error,data)=>{
        if(data){
        return rep.status(200).json({data:data,error_code:200})
      }

      return rep.status(200).json({error_code:201,success:'该商品暂时没有评论'})
  })
})

router.post('/jdfhnbx6',(req,rep)=>{
  jdnb.findOne({iphone:req.body.iphone},(error,data)=>{
    var c = []
    data.receiving.find(element=>{
      element.listCar.find(ele=>{
        c.push(ele)
      })
    })
    var b = c.find(el=>{
      return el._id == req.body._id
    })
    var d = Date.now()
    b.xdsj = d
    b.x3 = true
    // console.log(b)
    setTimeout(() => {
    new jdnb (data).save((error,data)=>{
      rep.status(200).json({data:data})
    })
    }, 500);
  })
})

router.post('/pinglunB',(req,rep)=>{
    pl.findOne({utitle:req.body.utitle},(error,data)=>{
        if(!data){
          new pl(req.body).save((error,data)=>{
            data.pl.unshift(req.body)
              new pl(data).save((error,data)=>{
                return rep.status(200).json({data:'第一次添加成功了',data:data,error_code:201})
              })
          })
        }else{
          data.pl.unshift(req.body)
          new pl(data).save((error,data)=>{
            return rep.status(200).json({data:'真的',data1:data,error_code:200})
          })
        }
    })
})









// 此处往下 都是 关于 聊天提示的 over 

router.post('/xxts',(req,rep)=>{
  rep.header("cache-control", "no-store");
  lttx.findOne({iphone:req.body.iphone,title1:req.body.title1},(error,data)=>{
    if(data){
      data.title2 = req.body.title2 
      data.create_time = Date.now()
      data.lt.push(req.body)
      new lttx(data).save((error,data)=>{
        if(error){
          return rep.status(200).json({success:'提交的字段有错误,请重新检查'})
        }
        rep.status(200).json({success:'成功了,请检查是否错误',data:data})
      })
    }else{
      new lttx(req.body).save((error,data)=>{
        if(error){
          return rep.status(200).json({success:'提交的字段有错误,请重新检查Else'})
        }
          data.lt.push(req.body)
          setTimeout(() => {
            new lttx(data).save((error,data)=>{
              rep.status(200).json({success:'成功了',data:data})
            })
          }, 100);
      })
    }
  })
})

// 一直轮询的地址 
 router.post('/lxxxts',(req,rep)=>{
   rep.header("cache-control", "no-store")
   lttx.find({iphone:req.body.iphone},(error,data)=>{
     rep.status(200).json({data:data,success:'成功了'})
   })
 })

 router.post('/deleteAs',(req,rep)=>{
  rep.header("cache-control", "no-store")
  lt.findOne({iphone:req.body.iphone,sort:req.body.sort},(error,data)=>{
    data.num = 0
    new lt(data).save((error,data)=>{
      rep.status(200).json({data:data})
    })
  })
 })

 router.post('/deleteAd',(req,rep)=>{
  rep.header("cache-control", "no-store")
      lttx.remove({iphone:req.body.iphone,sort:req.body.sort},(error,data)=>{
         rep.status(200).json({data:data})
      })
 })


module.exports = router
