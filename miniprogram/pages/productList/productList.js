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
    request.baseCloud({
      params: {
      },
      fun: "product",
      url: "getAllProduct",
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
  /**
   * 管理库存
   */
  manageStock: function(e){
    var product = this.data.productList[e.currentTarget.dataset.index]
    var productStr = JSON.stringify(product)
    wx.navigateTo({
      url: '../managesku/managesku?product=' + productStr,
    })
  },

  /**
   * 删除商品
   */
  deleteProduct: function (e) {
    let thisPage = this
    wx.showModal({
      title: '删除商品',
      content: '删除后不可恢复，确定删除吗？',
      success: function(res){
        if (res.confirm){
          var id = e.currentTarget.dataset.productId
          request.baseCloud({
            params: {
              _id: id
            },
            fun: "product",
            url: "deleteProduct",
            onStart() {
              wx.showLoading({
                title: '',
              })
            },
            onSuccess: function (res) {
              thisPage.getProductList()
            },
            onError: function (res) {
              console.log(res.msg)
            },
            onComplete: function () {
              wx.hideLoading()
            }
          })
        }
      },
      fail: function(){
        wx.showToast({
          title: '出错了，请重试',
          icon: "none"
        })
      }
    })
  }
})