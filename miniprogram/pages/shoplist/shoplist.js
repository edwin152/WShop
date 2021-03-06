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
    this.isRegister()
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

    this.getProductList()
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
    // var productStr = JSON.stringify(product)
    wx.navigateTo({
      url: '../product/product?productId=' + product._id,
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
   * 获取商品列表
   */
  getProductList: function() {
    var thisPage = this
    request.baseCloud({
      params: {},
      fun: "product",
      url: "searchProduct",
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
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 用户登录
   */
  userLogin: function() {
    let thisPage = this
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function(user) {
        request.baseCloud({
          params: {
            avatar: user.userInfo.avatarUrl,
            name: user.userInfo.nickName,
          },
          fun: "user",
          url: "login",
          onStart: function() {
            wx.showLoading({
              title: '',
            })
          },
          onSuccess: function(res) {
            wx.showToast({
              title: '登录成功',
              icon: "none"
            })
            thisPage.setData({
              loginDialog: false
            })
          },
          onError: function(res) {
            console.log(res)
            wx.showToast({
              title: '登录失败',
            })
          },
          onComplete: function() {
            wx.hideLoading()
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
    wx.getSetting({
      success: function(res) {
        // res.authSetting.scope.userInfo
        if (res.authSetting["scope.userInfo"])
          return
        thisPage.setData({
          loginDialog: true
        })
      }
    })
  },

  /**
   * 订单列表
   */
  leftButton: function(e) {
    wx.navigateTo({
      url: '/pages/orderlist/orderlist',
    })
  },

  /**
   * 设置
   */
  titleButton: function(e) {
    let thisPage = this
    request.baseCloud({
      params: {},
      fun: "user",
      url: "isManager",
      onStart: function() {
      },
      onSuccess: function(res) {
        if (res.data){
          wx.navigateTo({
            url: '/pages/setting/setting',
          })
        }
      },
      onError: function(res) {
        console.log(res)
        wx.showToast({
          title: '请求失败请重试',
        })
      },
      onComplete: function() {
      }
    })

  },

  /**
   * 订单列表
   */
  rightButton: function(e) {
    wx.navigateTo({
      url: '/pages/shopcart/shopcart',
    })
  }
})