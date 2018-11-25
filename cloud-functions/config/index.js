////// 云函数入口文件
//const cloud = require('wx-server-sdk')
//exports.main = async (event, context) => {
//return {
//  sum: event.a + event.b
//}
//}

var log = console.log.bind(console)
    

const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
  return db.collection('config').get()
}

//// index.js 是入口文件，云函数被调用时会执行该文件导出的 main 方法
//// event 包含了调用端（小程序端）调用该函数时传过来的参数，同时还包含了可以通过 getWXContext 方法获取的用户登录态 `openId` 和小程序 `appId` 信息
//const cloud = require('wx-server-sdk')
//exports.main = (event, context) => {
//let { userInfo, a, b} = event
//let { OPENID, APPID } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
//let sum = a + b
//
//return {
//  OPENID,
//  APPID,
//  sum
//}
//}