// pages/editSku/editSku.js
var request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    var productStr = options.product
    var product = JSON.parse(productStr)
    var skuStr = options.sku
    var sku = JSON.parse(skuStr)
    this.setData({
      product: product,
      props: product.prop_list,
      skus: sku
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 保存库存信息
   */
  saveProductInfo: function (e) {
    var thisPage = this
    request.baseCloud({
      params: {
        _id: thisPage.data.skus._id,
        trade_price: e.detail.value.tradePrice,
        retail_price: e.detail.value.retailPrice,
        stock_count: e.detail.value.stockCount
      },
      fun: "product",
      url: "editSku",
      onStart: function () {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function (res) {
        console.log(res.data)
        thisPage.setData({
          [skus.trade_price]: res.data.trade_price,
          [skus.retail_price]: res.data.retail_price,
          [skus.stock_count]: res.data.stock_count,
        })
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
        wx.stopPullDownRefresh()
      }
    })
  }
})