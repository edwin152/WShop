// pages/editproduct/editproduct.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:{},
    productName: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var productStr = options.product
    var productBean = JSON.parse(productStr)
    this.setData({
      product: productBean,
      productName: productBean.name
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
    if (this.data.productName.length <= 0) {
      wx.showToast({
        title: '未更改名称',
        icon: "none"
      })
      return
    }
    var thisPage = this
    request.baseCloud({
      params: {
        _id: thisPage.product._id,
        name: thisPage.data.productName,
        image_list: thisPage.data.product.imagesList
      },
      fun: "product",
      url: "editProduct",
      onStart: function () {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function (res) {
        // console.log(res.data)
        wx.showToast({
          title: '保存成功',
          icon: "none"
        })
        wx.navigateBack({

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
      }
    })
  },
  /**
   * 上传图片
   */
  uploadProductImage: function () {
    let thisPage = this
    wx.chooseImage({
      count: 1,
      sizeType: "original",
      sourceType: "album",
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        // 上传图片
        const cloudPath = new Date().getTime() + filePath.match(/\.[^.]+?$/)[0]

        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            // 获取图片地址
            var imageUrl = res.fileID
            var imageList = thisPage.data.product.imagesList
            imageList.push(imageUrl)
            thisPage.setData({
              ["product.imagesList"]: imageList
            })
            wx.hideLoading()

          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.hideLoading()
            wx.showToast({
              title: '上传失败，请重试',
              icon: "none"
            })
          },
          complete: () => {
          }
        })
      },
      fail: function () {

      }
    })

  },
})