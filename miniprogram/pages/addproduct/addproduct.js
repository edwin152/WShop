// pages/addproduct/addproduct.js
var request = require("../../utils/request.js")
var imageIndex = -1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesList: [],
    propList: [],
    selectPropIdList: [],
    productDescribe:'',
    productName: "",
    images: [],
    swiperIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()
    this.getPropAll()
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
   * 输入商品名称
   */
  inputDescribe: function(e) {
    this.setData({
      productDescribe: e.detail.value
    })
  },

  /**
   * 获取所有规格
   */
  getPropAll: function() {
    var thisPage = this
    request.baseCloud({
      params: {},
      fun: "prop",
      url: "getAllProp",
      onStart: function() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        // console.log(res.data)
        thisPage.setData({
          propList: res.data
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
   * 点击规格
   */
  clickProp: function(e) {
    var propList = this.data.propList
    var prop = propList[e.currentTarget.dataset.propId]
    if (!prop.hasOwnProperty("isSelect") || !prop.isSelect) {
      prop.isSelect = true
    } else {
      prop.isSelect = false
    }
    this.setData({
      propList: propList
    })

  },
  /**
   * 保存商品
   */
  submit: function(e) {
    if (this.data.productName.length <= 0) {
      wx.showToast({
        title: '请填写商品名称',
        icon: "none"
      })
      return
    }
    var propList = this.data.propList
    var selectList = []
    for (var i = 0; i < propList.length; i++) {
      if (propList[i].isSelect) {
        selectList.push(propList[i]._id)
      }
    }
    var thisPage = this
    request.baseCloud({
      params: {
        prop_list: selectList,
        name: thisPage.data.productName,
        describe: thisPage.data.productDescribe,
        image_list: thisPage.data.imagesList
      },
      fun: "product",
      url: "createProduct",
      onStart: function() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        // console.log(res.data)
        wx.showToast({
          title: '保存成功',
          icon: "none"
        })
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
      }
    })
  },
  /**
   * 滑动图片
   */
  changeImageIndex: function (e) {
    // console.log(e)
    imageIndex = e.detail.current
  },

  /**
   * 上传图片
   */
  uploadProductImage: function() {
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
            var imageList = thisPage.data.imagesList
            imageList.push(imageUrl)
            thisPage.setData({
              imagesList: imageList
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
      fail: function(){
        
      }
    })

  },

  /**
   * 删除图片
   */
  deleteImage: function(e){
    var imageList = this.data.imagesList
    imageList.splice(imageIndex, 1)
    this.setData({
      imagesList: imageList,
      swiperIndex: 0
    })
  }
})