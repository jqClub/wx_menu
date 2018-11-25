var log = console.log.bind(console)
//index.js
//获取应用实例
const app = getApp()

//11.25新增定时
const util = require('../../utils/util.js')
const defaultLogName = {
  work: '工作',
  rest: '休息'
}
const actionName = {
  stop: '停止',
  start: '开始'
}

const initDeg = {
  left: 45,
  right: -45,
}



Page({
  data: {
    imglist: [   
      '../../images/t.jpg',
      '../../images/z.jpg',
      '../../images/h.jpg',
      '../../images/g.jpg',
      '../../images/b.jpg',
      '../../images/l.jpg',
      '../../images/c.jpg',
      '../../images/c1.jpg',
      '../../images/c2.jpg',
      '../../images/c3.jpg',
      '../../images/tt.jpg',
      '../../images/m.jpg',
      '../../images/gj.jpg',
     ],
     //11.25新增定时
      remainTimeText: '',
    timerType: 'work',
    log: {},
    completed: false,
    isRuning: false,
    leftDeg: initDeg.left,
    rightDeg: initDeg.right
  },
  onLoad: function () {
      var that = this
       wx.cloud.init()
       
    // 页面渲染后 执行
    wx.cloud.callFunction({
          // 需调用的云函数名
          name: 'config', 
          // 传给云函数的参数
          data: {       
            a: 12,
            b: 19,
          },
          // 成功回调
          complete: function(res) {
              log(res)
              res = res || {}
              var data = res.result.data[0]
              var show_menu = data.show_menu || 0
              that.setData({
                  show_menu,
              })
          }
    })
  },
  
  onShow: function() {
    if (this.data.isRuning) return
    let workTime = util.formatTime(wx.getStorageSync('workTime'), 'HH') || 45
    let restTime = util.formatTime(wx.getStorageSync('restTime'), 'HH') || 10
    this.setData({
      workTime: workTime,
      restTime: restTime,
      remainTimeText: workTime + ':00'
    })
  },
////////////////////////////////////////////
////////////////////////////////////////////
//定时-start
  startTimer: function(e) {
    let startTime = Date.now()
    let isRuning = this.data.isRuning
    let timerType = e.target.dataset.type
    let showTime = this.data[timerType + 'Time']
    let keepTime = showTime * 60 * 1000
    let logName = this.logName || defaultLogName[timerType]

    if (!isRuning) {
      this.timer = setInterval((function() {
        this.updateTimer()
        this.startNameAnimation()
      }).bind(this), 1000)
    } else {
      this.stopTimer()
    }

    this.setData({
      isRuning: !isRuning,
      completed: false,
      timerType: timerType,
      remainTimeText: showTime + ':00',
      taskName: logName
    })

    this.data.log = {
      name: logName,
      startTime: Date.now(),
      keepTime: keepTime,
      endTime: keepTime + startTime,
      action: actionName[isRuning ? 'stop' : 'start'],
      type: timerType
    }

    this.saveLog(this.data.log)
  },

  startNameAnimation: function() {
    let animation = wx.createAnimation({
      duration: 450
    })
    animation.opacity(0.2).step()
    animation.opacity(1).step()
    this.setData({
      nameAnimation: animation.export()
    })
  },

  stopTimer: function() {
    // reset circle progress
    this.setData({
      leftDeg: initDeg.left,
      rightDeg: initDeg.right
    })

    // clear timer
    this.timer && clearInterval(this.timer)
  },

  updateTimer: function() {
    let log = this.data.log
    let now = Date.now()
    let remainingTime = Math.round((log.endTime - now) / 1000)
    let H = util.formatTime(Math.floor(remainingTime / (60 * 60)) % 24, 'HH')
    let M = util.formatTime(Math.floor(remainingTime / (60)) % 60, 'MM')
    let S = util.formatTime(Math.floor(remainingTime) % 60, 'SS')
    let halfTime

    // update text
    if (remainingTime > 0) {
      let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
      this.setData({
        remainTimeText: remainTimeText
      })
    } else if (remainingTime == 0) {
      this.setData({
        completed: true
      })
      this.stopTimer()
      return
    }

    // update circle progress
    halfTime = log.keepTime / 2
    if ((remainingTime * 1000) > halfTime) {
      this.setData({
        leftDeg: initDeg.left - (180 * (now - log.startTime) / halfTime)
      })
    } else {
      this.setData({
        leftDeg: -135
      })
      this.setData({
        rightDeg: initDeg.right - (180 * (now - (log.startTime + halfTime)) / halfTime)
      })
    }
  },

  changeLogName: function(e) {
    this.logName = e.detail.value
  },

  saveLog: function(log) {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(log)
    wx.setStorageSync('logs', logs)
  },
  
//定时-end
///////////////////////////////////////////
///////////////////////////////////////////

  /**   
       * 预览图片  
       */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imglist // 需要预览的图片http链接列表  
    })
  }, 
  // 拨打电话
  callmeTap: function () {
    wx.makePhoneCall({
      phoneNumber: '13633847837'
    })
  } ,
  // 打开地图
  openArea: function() {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: 34.619060,
          longitude: 113.691100,
          name: '湖北餐馆',
          address: '河南省新郑市龙湖镇-祥和路工程学院南门西80米',
          scale: 28,
        })
      }
    })
  },
    //页面跳转 3
    bindViewTap_three: function(e) {
        var that = this;    
        //获得临时对象
        var targe_id = e.target.dataset.targe;  //获取这个自定义的targe数据
        var data = e.target.dataset.data;      //可以设置跳转所带的参数
        var type = e.target.dataset.type;      //打开的方式
        app.bindViewTap_three(targe_id,data,type,that.data.index)   
        
//      //需要登陆
//      if( typeof(app.data.userInfo.token) == 'string' && app.data.userInfo.token.length>0  ){}else{
//          that.get_grant_again(function(){   //重新授权
//              app.bindViewTap_three(targe_id,data,type,that.data.index)   
//          });
//          return
//      }
        
//      switch ( targe_id ){
//          case 'arena_game':
//              //可以做不同页面的操作        
//              if( that.data.ring.user.ticket ){
//                  app.bindViewTap_three(targe_id,data,type,that.data.index)   
//                  // app.bindViewTap_three('challenge_index', '?bingo=bingo', 'redirectTo')   //'redirectTo'--清掉当前的页面
//              }else{
//                  that.setgame_state(3)
//              }
//              break;
//          default:
//              app.bindViewTap_three(targe_id,data,type,that.data.index)   
//              break;
//      }
//      
//      clearInterval(that.timer);      //清除当前页面中的定时器等
        
    },
})