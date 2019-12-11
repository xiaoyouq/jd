const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })

const list = new Schema({
    utitle:{
      type:String,
      required:true
    },
    pl:{
      type:[],
      default:[]
    },
    creatTime:{
      type:Number,
      default:Date.now
    }
})

module.exports =  mongoose.model('sppinglun',list)