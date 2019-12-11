const mongoose = require('mongoose')

const Schame = mongoose.Schema

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })


var  list = new Schame({
      title:{
        type:String,
        required:true,
      },
      content:{
        type:String,
      },
      username:{
        type:String,
      },
      photo:{
        type:String,
      },
      account:{
        type:String,
      },
      created_time:{
        type:String,
        default:Date.now
      }
})

module.exports = mongoose.model('discuss',list)
