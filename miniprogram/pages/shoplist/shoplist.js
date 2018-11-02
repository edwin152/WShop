// pages/shoplist/shoplist.js
var request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = require("../../utils/date.js")
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
    this.getProductList()

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
   * 点击商品
   */
  productDetail:function(e){
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
  searchFocus:function(e){
    this.setData({
      isInput: true
    })
  },
  /**
   * 输入框获取焦点
   */
  searchBlur:function(e){
    this.setData({
      isInput: false
    })
  },
  /**
   * 搜索商品
   */
  searchProduct:  function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value.search)
  },

  /**
   * 获取商品列表
   */
  getProductList: function () {
    var thisPage = this
    request.baseRequest({
      params: {
        name: ""
      },
      url: "product/searchProduct.do",
      onStart() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function (res) {
        thisPage.setData({
          shopList: res.data
        })
      },
      onError: function (res) {
        console.log(res.msg)
      },
      onComplete: function () {
        wx.hideLoading()
      }
    })
  },
})