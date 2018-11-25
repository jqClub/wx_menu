var log = console.log.bind(console)
//index.js
//获取应用实例
const app = getApp()

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
  },
  onLoad: function () {
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
          }
    })
//  // 当然 promise 方式也是支持的
//  wx.cloud.callFunction({
//    name: 'config',
//  }).then(function(res) {
//      log(res)
//  })
  },

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
  }
})