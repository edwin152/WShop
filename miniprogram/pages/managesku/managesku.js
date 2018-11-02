// pages/managesku/managesku.js
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
    var skus = []
    for (var key in product.skus){
      skus.push(product.skus[key])
    }
    this.setData({
      product: product,
      skus: skus
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
  
})