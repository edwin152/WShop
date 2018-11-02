// pages/productList/productList.js
var request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductList()
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
   * 获取商品列表
   */
  getProductList: function(){
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
          productList: res.data
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
  /**
   * 编辑商品
   */
  editProduct:function(e){
    var product = this.data.productList[e.currentTarget.dataset.index]
    var productStr = JSON.stringify(product)
    wx.navigateTo({
      url: '../editproduct/editproduct?product=' + productStr,
    })
  },
  manageStock: function(e){
    var product = this.data.productList[e.currentTarget.dataset.index]
    var productStr = JSON.stringify(product)
    wx.navigateTo({
      url: '../managesku/managesku?product=' + productStr,
    })
  }
})