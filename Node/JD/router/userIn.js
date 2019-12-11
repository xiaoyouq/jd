const express = require('express')

const router = express.Router()

const iphone = require('../database/iphoneUser.js')
const carDian = require('../database/carDian.js')
const jdnb = require('../../JD/database/nbDian.js')


router.get('/userEndTie',(req,rep)=>{
  iphone.findOne({iphone:req.query.c},(error,data)=>{
    var c=Date.now()
    data.end_time = c
    new iphone(data).save((error,data)=>{
      rep.status(200).json({data:data})
    })
  })
})

router.get('/iphoneUserIN',(req,rep)=>{
  iphone.find((error,data)=>{
    rep.status(200).json({data:data})
  })
})

// 收货 收货 收货
// 查找并且发货
router.post('/jdfhnbx5',(req,rep)=>{
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
    b.x2 = true
    // console.log(b)
    setTimeout(() => {
    new jdnb (data).save((error,data)=>{
      rep.status(200).json({data:data})
    })
    }, 500);
  })
})

// 查找并且发货
router.post('/jdfhnbx4',(req,rep)=>{
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
    b.x4 = true
    // console.log(b)
    setTimeout(() => {
    new jdnb (data).save((error,data)=>{
      rep.status(200).json({data:data})
    })
    }, 500);
  })
})

// 查找所有 
router.post('/jdnbFInd',(req,rep)=>{
  jdnb.findOne({iphone:req.body.iphone},(error,data)=>{
      if(!data){
        return  rep.status(200).json({error_code:202})
      }
      rep.status(200).json({error_code:200,data:data})
  })
})


// 待付款不想要了
router.post('/bxyaoleq',(req,rep)=>{
    jdnb.findOne({iphone:req.body.iphone},(error,data)=>{
      data.dfk.splice(req.body.index,1)
      new jdnb(data).save((error,data)=>{
        rep.status(200).json({data:data})
      })
    })
})

// 删除待付款
router.get('/routerIndexDe',(req,rep)=>{
  jdnb.findOne({iphone:req.query.iphone},(error,data)=>{
    data.dfk.splice(req.query.index,1)
    new jdnb(data).save((error,data)=>{
        rep.status(200).json({data:data})
    })
  })
})

// 查找所有 
router.get('/findJdnb',(req,rep)=>{
    jdnb.findOne({iphone:req.query.iphone},(error,data)=>{
      rep.status(200).json({data:data})
    })
})

// 添加到待付款中
router.post('/jdnbDfk',(req,rep)=>{
  jdnb.findOne({iphone:req.body.iphone},(error,data)=>{
    var c = data.dfk.find(el=>{
     return  el.data.content == req.body.data.content
    })
    if(c){
      return rep.status(200).json({data:data,success:'不能添加了'})
    }else{
      data.dfk.unshift(req.body)
      new jdnb(data).save((error,data)=>{
        return rep.status(200).json({data:data,success:'添加成功成功'})
      })
    }
      
  })
})

// 删除购物车系列
router.post('/delewgc',(req,rep)=>{
  jdnb.findOne({iphone:req.body.iphone},(error,data)=>{
       for(let i= 0,count=0;i<data.obligation.length;i++){
      if(req.body.c.indexOf(i+count) !== -1){
          data.obligation.splice(i,1)
          req.body.c.splice(req.body.c.indexOf(i+count),1)
          i--,count++
      }
    }
    setTimeout(el=>{
        new jdnb(data).save((error,data)=>{
          rep.status(200).json({data:data})
        })
    },500)
  })
})

// 添加优惠券 
router.post('/yhqtj',(req,rep)=>{
  iphone.findOne({iphone:req.body.iphone},(error,data)=>{
    data.coupons.unshift(req.body.c)
    new iphone(data).save((error,data)=>{
      rep.status(200).json({data:data})
    })
  })
})

// 把优惠券转移 
router.post('/yhqzy',(req,rep)=>{
  iphone.findOne({iphone:req.body.iphone},(error,data)=>{
    data.disabledCoupons.unshift(req.body.yhq)
    data.coupons.splice(req.body.yhq,1)
      new iphone(data).save((error,data)=>{
          rep.status(200).json({data:data})
      })
  })
})

router.post('/dshss',(req,rep)=>{
  jdnb.findOne({iphone:req.body.iphone},(error,data)=>{
    data.receiving.unshift(req.body)
    new jdnb(data).save((error,data)=>{
      rep.status(200).json({data:data})
          })
  })
})

// 足迹 
router.post('/zuji',(req,rep)=>{
  jdnb.findOne({iphone:req.body.iphone},(error,data)=>{
    if(data.footprint.length == 0){
      data.footprint.unshift(req.body.data)
      new jdnb(data).save((error,data)=>{
        return rep.status(200).json({error_code:200,success:data})
        })
      }else{
        var c =  data.footprint.find(el=>{
               return el.utitle == req.body.data.utitle
         })
         if(c){
           return rep.status(200).json({error_code:201,success:'不能添加'})
         }else{
          data.footprint.unshift(req.body.data)
          new jdnb(data).save((error,data)=>{
            return rep.status(200).json({error_code:202,success:data})
            })
         }
      }

  })
})

// 删除
router.get('/deletejdnb',(req,rep)=>{
  jdnb.findOne({iphone:req.query.iphone},(error,data)=>{
    data.obligation.splice(req.query.ins,1)
    new jdnb(data).save((error,data)=>{
      rep.status(200).json({error_code:200,success:'删除成功'})
    })
  })
})


router.post('/pushjdnb',(req,rep)=>{
  jdnb.findOne({iphone:req.body.iphone},(error,data)=>{
    var c = req.body.data
    c.iphone = req.body.iphone
   var d =  data.obligation.find(el=>{
        return el.utitle == c.utitle
    })
    if(d){
      // 真的说明有 不再添加 
      return rep.status(200).json({error_code:303,suecess:'不能重复添加'})
    }
    data.obligation.unshift(c)
    new jdnb(data).save((error,data)=>{
      rep.status(200).json({data:data,success:'成功',error_code:200})
    })
  })
})

router.get('/ggojdnb',(req,rep)=>{
    jdnb.findOne({iphone:req.query.iphone},(error,data)=>{
      rep.status(200).json({data:data,success:'成功'})
    })
})

//查看关注店铺  
router.get('/ggoCarDian',(req,rep)=>{
  carDian.find((error,data)=>{
      rep.status(200).json({data:data,success:'成功'})
  })
})

// 需要删除
router.get('/deleteCarDian', (req, rep) => {
  carDian.findOne({ name: req.query.name }, (error, data) => {
    // var c=  data.find(el=>{
    //   return el.name == req.query.name 
    // })
    var b = data.people.findIndex(el => {
      return el.username == req.query.username
    })
    data.people.splice(b, 1)
    new carDian(data).save((error, data) => {
      rep.status(200).json({ data: data ,error_code:223})
    })
  })
})

// 添加
router.post('/putCarDian2', (req, rep) => {
  carDian.findOne({ name: req.body.name }, (error, data) => {
    if (!data) {
      new carDian({ name: req.body.name }).save((error, data) => {
        data.people.unshift(req.body.title)
        new carDian(data).save((error, data) => {
          return rep.status(200).json({ data: data ,error_code:222})
        })
      })
    } else {  
      data.people.unshift(req.body.title)
      new carDian(data).save((error, data) => {
          rep.status(200).json({ data:data,error_code:222})
      })
    }


  })
})

// 查找所有
router.get('/carDian2', (req, rep) => {
  carDian.find((error, data) => {
    rep.status(200).json({ error_code: 200, success: data })
  })
})

// 保存地址 
router.post('/user/plot', (req, rep) => {
  iphone.findOne({ iphone: req.body.iphones }, (error, data) => {
    if (error) {
      return rep.status(500).json({ error_code: 500, type: '服务器渲染失败' })
    }

    if (!data) {
      return rep.status(200).json({ error_code: 201, type: '没找到该账号,请重新登陆' })
    }

    // rep.status(200).json({ error_code: 200, type: '添加成功', data: data })

    if (data.shouhuodizhi.length == 0) {
      req.body.checked = true
      data.shouhuodizhi.push(req.body)
      new iphone(data).save((error, data) => {
        if (error) {
          return rep.status(500).json({ error_code: 500, type: '服务器渲染失败' })
        }
        return rep.status(200).json({ error_code: 200, type: '添加成功', data: data })
      })
    } else if (data.shouhuodizhi.length >= 1) {
      // 若提交的是true
      if (req.body.checked == true) {
        var c = data.shouhuodizhi.find(ele => {
          return ele.checked == true
        })
        c.checked = false
        new iphone(data).save((error, data) => {
          if (error) {
            return rep.status(500).json({ error_code: 500, type: '服务器渲染失败' })
          }
          data.shouhuodizhi.push(req.body)
          new iphone(data).save((error, data) => {
            if (error) {
              return rep.status(500).json({ error_code: 500, type: '服务器渲染失败' })
            }
            return rep.status(200).json({ error_code: 200, type: '添加成功', data: data })
          })

        })
        // 若提交的是false+
      } else if (req.body.checked == false) {
        data.shouhuodizhi.push(req.body)
        new iphone(data).save((error, data) => {
          if (error) {
            return rep.status(500).json({ error_code: 500, type: '服务器渲染失败' })
          }

          rep.status(200).json({ error_code: 200, type: '添加成功', data: data })
        })
      }

    }

  })
})

// 查找所有地址
router.get('/deletePlot', (req, rep) => {
  iphone.findOne({ iphone: req.query.iphone }, (error, data) => {
    if (!data) {
      return rep.status(200).json({ error_code: 201 })
    }
    data.shouhuodizhi = []
    new iphone(data).save((error, data) => {
      if (error) {
        return rep.status(200).json({ error_code: 201 })
      }
      rep.status(200).json({ error_code: 200, data: data })
    })
  })
})

// 删除地址
router.get('/deletepp', (req, rep) => {
  iphone.findOne({ iphone: req.query.iphone }, (error, data) => {
    if (!data) {
      return rep.status(200).json({ error_code: 201 })
    }
    data.shouhuodizhi.splice(req.query.e, 1)
    new iphone(data).save((error, data) => {
      if (error) {
        return rep.status(200).json({ error_code: 201 })
      }
      rep.status(200).json({ error_code: 200, data: data })
    })
  })
})




// 商品的收藏
router.post('/goodsCollections', (req, rep) => {
  jdnb.findOne({ iphone: req.body.useri }, (error, data) => {
    data.goodsCollections.unshift(req.body.data)
    new jdnb(data).save((error, data) => {
      rep.status(200).json({ error_code: 200, session: '添加成功' })
    })
  })
})
// 删除这个收藏 
router.post('/deleteGoodsCollections', (req, rep) => {
  jdnb.findOne({ iphone: req.body.useri }, (error, data) => {
    var c = data.goodsCollections.findIndex(ele => {
      return ele.utitle == req.body.data.utitle
    });
    data.goodsCollections.splice(c, 1)
    new jdnb(data).save((error, data) => {
      rep.status(200).json({ error_code: 200, session: '添加成功', data: data })
    })
  })
})


// 判断用户输入的密码是否正确
router.post('/passwordSj',(req,rep)=>{
  iphone.findOne({iphone:req.body.iphone},(error,data)=>{
    if(data.password == req.body.password && data.iphone ==req.body.iphone ){
      return rep.status(200).json({success:'验证成功',error_code:200})
    }else{
      return rep.status(200).json({success:'账号密码不对',error_code:201})
    }
  })
})



// 判断用户有没有收藏这个 

// router.post('/getGoodsCollections', (req, rep) => {
//   iphone.findOne({ iphone: req.body.useri }, (error, data) => {
//     var c = data.goodsCollections.find(ele => {
//       return ele.utitle == req.body.utitle
//     })
//     rep.status(200).json({ data: c })
//   })
// })
module.exports = router
