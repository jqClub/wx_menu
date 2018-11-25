//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }, 
    //页面跳转 3
    bindViewTap_three: function( targe_id, data , type , targe_from ) {
        var that = this;
        //频率控制
//      if( that.gettimestamp() - that.data.function_time < that.data.frequency ){console.log('点太快了你');return}
//      that.data.function_time = that.gettimestamp();
        var let_url = '../' + targe_id + '/' + targe_id;
        if(data) { let_url = let_url + data }
        switch (type){
            case 'navigateTo':
//              console.log('navigateTo')
                wx.navigateTo({url: let_url})
                break;
            case 'redirectTo':
//              console.log('redirectTo')
                wx.redirectTo({url: let_url})
                break;
            case 'switchTab':
//              console.log('switchTab')
                wx.switchTab({url: let_url})            
                break;
            case 'reLaunch':
//              console.log('reLaunch')
                wx.reLaunch({url: let_url})         
                break;
            case 'navigateBack':
//              console.log('navigateBack')
                wx.navigateBack({ delta: 1 })       
                break;
            default:
//              console.log('default')
                wx.navigateTo({url: let_url})
                break;
        }
        //腾讯统计
//      that.mta.Event.stat( targe_from+'_to_'+targe_id,{} )
//      console.log(targe_from+'_to_'+targe_id , let_url)
    },
})