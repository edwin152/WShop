// pages/editproduct/editproduct.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var productStr = options.product
    this.setData({
      product: JSON.parse(productStr)
    })
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
   * 输入商品名称
   */
  inputName: function(e) {
    this.setData({
      productName: e.detail.value
    })
  },
  /**
   * 保存商品
   */
  submit: function(e) {
    var propList = this.data.propList
    var selectList = []
    for (var i = 0; i < propList.length; i++) {
      if (propList[i].isSelect) {
        selectList.push(propList[i].id)
      }
    }
    var thisPage = this
    request.baseRequest({
      params: {
        prop_list: selectList,
        name: thisPage.data.productName,
        image_list: thisPage.data.images
      },
      url: "product/createProduct.do",
      onStart: function() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        // console.log(res.data)
        wx.navigateBack({

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
  }
})