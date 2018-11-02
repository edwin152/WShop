// pages/shopcart/shopcart.js
var request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editDialogIsShow: false,
    shopCartList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
    this.getShopCartInfo()
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
   * 获取购物车数据
   */
  getShopCartInfo: function() {
    var thisPage = this
    request.baseRequest({
      params: {},
      url: "user/getCart.do",
      onStart: function() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        console.log(res.data)
        thisPage.setData({
          shopCartList: res.data
        })
      },
      onError: function(res) {
        console.log(res)
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      },
      onComplete: function() {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 显示修改购物车数量弹框
   */
  editNumberShow: function() {
    // this.setData({
    //   editDialogIsShow: true
    // })
  },

  /**
   * 显示修改购物车数量弹框
   */
  closeDialog: function() {
    this.setData({
      editDialogIsShow: false
    })
  },

  /**
   * 修改购物车数量
   */
  editNumber: function(e) {
    var bean = this.data.shopCartList[e.currentTarget.dataset.itemIndex]
    var productCount = e.detail.value.count
    if (productCount.length <= 0) {
      wx.showToast({
        title: '请输入数量',
        icon: "none"
      })
      return
    }
    var shopCartStr = "{ \"sku\": \"" + bean.skus[propSelectStr].id + "\", \"count\": \"" + productCount + "\", \"choose\": true }"
    var thisPage = this
    request.baseRequest({
      params: {
        shop_cart: shopCartStr
      },
      url: "user/editCart.do",
      onStart: function() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        console.log(res.data)
        thisPage.setData({
          editDialogIsShow: false
        })
      },
      onError: function(res) {
        console.log(res)
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      },
      onComplete: function() {
        wx.hideLoading()
      }
    })

  },

  goPay: function() {
    var thisPage = this
    request.baseRequest({
      params: {
      },
      url: "order/createOrder.do",
      onStart: function () {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function (res) {
        console.log(res.data)
        // thisPage.setData({
        //   editDialogIsShow: false
        // })
      },
      onError: function (res) {
        console.log(res)
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      },
      onComplete: function () {
        wx.hideLoading()
      }
    })
  },
})