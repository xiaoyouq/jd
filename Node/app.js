const express = require('express')

const fs = require('fs')

const path = require('path')

const app = express()

// const cors = require('cors')


// app.use(cors())
// app.all('*',function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   if (req.method == 'OPTIONS') {
//     res.send(200);
//   }
//   else {
//     next();
//   }
// });

// 用户信息的缓存
const session = require('express-session')
app.use(session({
  secret: 'session_id',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000 * 60 * 30
  },
  rolling:true
}))


const bodyParser = require('body-parser')

app.set('views', path.join(__dirname, './views'))

app.use(bodyParser.urlencoded({ "limit":"100000kb"})); //根据需求更改limit大小
 app.use(bodyParser.json({ "limit":"100000kb"}));  //据需求更改limit大小
app.engine('html', require('express-art-template'))

app.use('/public', express.static(path.join(__dirname, './public')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var allowCors = function(req, res, next) {

    res.header('Access-Control-Allow-Origin', req.headers.origin);
  
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    res.header('Access-Control-Allow-Credentials','true');
  
    next();
  
  };
  
  app.use(allowCors);

const router = require('./router/router.js')
const userRouter = require('./router/user.js')
const classify = require('./router/clssify.js')
const board = require('./router/board.js')
const discuss = require('./router/discuss.js')
const swiper = require('./MiRouter/swiper.js')
const jd = require('./JD/router/jd.js')
const userIn = require('./JD/router/userIn.js')
const nbDian = require('./JD/router/nbDian.js')
const pl = require('./JD/router/pl.js')
app.use(router)
app.use(userRouter)
app.use(classify)
app.use(board)
app.use(discuss)
app.use(swiper)
app.use(jd)
app.use(userIn)
app.use(nbDian)
app.use(pl)

app.listen(3002, () => {
  console.log('服务器启动成功..')
})