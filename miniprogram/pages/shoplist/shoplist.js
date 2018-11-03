// pages/shoplist/shoplist.js
var request = require("../../utils/request.js")
var loginTime = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    loginDialog: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var data = require("../../utils/date.js")
    var thisPage = this
    this.isRegister()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getProductList()

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 点击商品
   */
  productDetail: function(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var product = this.data.shopList[index]
    var productStr = JSON.stringify(product)
    wx.navigateTo({
      url: '../product/product?product=' + productStr,
    })
  },
  /**
   * 输入框获取焦点
   */
  searchFocus: function(e) {
    this.setData({
      isInput: true
    })
  },
  /**
   * 输入框获取焦点
   */
  searchBlur: function(e) {
    this.setData({
      isInput: false
    })
  },
  /**
   * 搜索商品
   */
  searchProduct: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value.search)
  },

  /**
   * 获取商品列表
   */
  getProductList: function() {
    var thisPage = this
    request.baseCloud({
      params: {},
      fun: "product",
      url: "getAllProduct",
      onStart() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        thisPage.setData({
          shopList: res.data
        })
      },
      onError: function(res) {
        console.log(res.msg)
      },
      onComplete: function() {
        wx.hideLoading()
      }
    })
  },

  userLogin: function() {
    let thisPage = this
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function(res) {
        wx.cloud.callFunction({
          name: "user",
          data: {
            name: "login",
            avatarUrl: res.userInfo.avatarUrl,
            userName: res.userInfo.nickName,
          },
          success: function(r) {
            wx.showToast({
              title: '登录成功',
              icon: "none"
            })
            thisPage.setData({
              loginDialog: false
            })
            wx.showTabBar({

            })
          },
          fail: function() {
            wx.showToast({
              title: '登录失败',
            })
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 判断用户是否授权
   */
  isRegister: function() {
    let thisPage = this
    // request.baseCloud({
    //   params: {
    //   },
    //   fun: "user",
    //   url: "isRegister",
    //   onStart: function () {
    //     wx.showLoading({
    //       title: '',
    //     })
    //   },
    //   onSuccess: function (res) {
    //     console.log(res.data)
    //     if (res.data.isRegister){
    //       thisPage.setData({
    //         loginDialog: false
    //       })
    //       wx.showTabBar({

    //       })
    //     }else{
    //       wx.hideTabBar({

    //       })
    //       thisPage.setData({
    //         loginDialog: true
    //       })
    //     }
    //   },
    //   onError: function (res) {
    //     console.log(res)
    //   },
    //   onComplete: function () {
    //     wx.hideLoading()
    //     wx.stopPullDownRefresh()
    //   }
    // })
    wx.getSetting({
      success: function(res) {
        // res.authSetting.scope.userInfo
        if (res.authSetting["scope.userInfo"])
          return
        wx.hideTabBar({

        })
        thisPage.setData({
          loginDialog: true
        })
      }
    })
  }
})