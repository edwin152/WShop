// pages/managesku/managesku.js
let request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

    product: {},
    skus:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var productStr = options.product
    var product = JSON.parse(productStr)
    // var skus = []
    // for (var key in product.skus){
    //   skus.push(product.sku_list[key])
    // }
    this.setData({
      product: product,
      // skus: skus
    })
    this.getAllSku()
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
   * 新增库存
   */
  addSku: function (e) {
    var product = this.data.product
    var productStr = JSON.stringify(product)
    wx.navigateTo({
      url: '../addsku/addsku?product=' + productStr,
    })
  },
  /**
   * 获取所有sku
   */
  getAllSku: function(){
    let thisPage = this
    request.baseCloud({
      params: {
        product_id: thisPage.data.product._id,
      },
      fun: "product",
      url: "getAllSku",
      onStart: function () {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function (res) {
        console.log(res.data)
        thisPage.setData({
          skus: res.data
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
  },

  /**
   * 编辑sku
   */
  editSku: function(e){
    var product = this.data.product
    var productStr = JSON.stringify(product)
    var sku = this.data.skus[e.currentTarget.dataset.index]
    var skuStr = JSON.stringify(sku)
    wx.navigateTo({
      url: '../editSku/editSku?product=' + productStr + "&sku=" + skuStr,
    })
  },

  /**
   * 删除sku
   */
  deleteSku: function(e){
    let thisPage = this
    wx.showModal({
      title: '删除规格',
      content: '删除后不可恢复，确定删除吗？',
      success: function (res) {
        if (res.confirm) {
          var skuId = e.currentTarget.dataset.skuId
          request.baseCloud({
            params: {
              _id: skuId,
            },
            fun: "product",
            url: "deleteSku",
            onStart: function () {
              wx.showLoading({
                title: '',
              })
            },
            onSuccess: function (res) {
              console.log(res.data)
              wx.showToast({
                title: '删除成功',
                icon: "none"
              })
              thisPage.getAllSku()
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
      },
      fail: function () {
        wx.showToast({
          title: '出错了，请重试',
          icon: "none"
        })
      }
    })
    
  }
})