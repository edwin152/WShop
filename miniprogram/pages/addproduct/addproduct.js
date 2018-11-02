// pages/addproduct/addproduct.js
var request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesList:[],
    propList: [],
    selectPropIdList: [],
    productName: "",
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPropAll()
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
   * 输入商品名称
   */
  inputName: function(e){
    this.setData({
      productName: e.detail.value
    })
  },

  /**
   * 获取所有规格
   */
  getPropAll: function(){
    var thisPage = this
    request.baseRequest({
      params: {
      },
      url: "prop/getAllProp.do",
      onStart: function () {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function (res) {
        // console.log(res.data)
        thisPage.setData({
          propList: res.data
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
   * 点击规格
   */
  clickProp: function(e){
    var propList = this.data.propList
    var prop = propList[e.currentTarget.dataset.propId]
    if (!prop.hasOwnProperty("isSelect") || !prop.isSelect){
      prop.isSelect = true
    }else{
      prop.isSelect = false
    }
    this.setData({
      propList: propList
    })
    
  },
  /**
   * 保存商品
   */
  submit: function (e) {
    var propList = this.data.propList
    var selectList = []
    for (var i = 0; i < propList.length; i++){
      if (propList[i].isSelect){
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
      onStart: function () {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function (res) {
        // console.log(res.data)
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
  }
})