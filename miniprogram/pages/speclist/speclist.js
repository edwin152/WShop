// pages/speclist/speclist.js
var request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    propList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    this.getSpecList();
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
    this.getSpecList();
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
   * 获取规格列表
   */
  getSpecList() {
    var thisPage = this
    request.baseRequest({
      params: {
      },
      url: "prop/getAllProp.do",
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
   * 编辑规格
   */
  editProp: function(e) {
    // console.log(e)
    // return
    var prop = this.data.propList[e.currentTarget.dataset.itemId]
    var str = JSON.stringify(prop)
    wx.navigateTo({
      url: '../editProp/editProp?prop=' + str,
    })
  },
  /**
   * 删除规格
   */
  deleteProp: function() {
    request.baseRequest({
      params: {
      },
      url: ".do",
      onStart: function() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        console.log(res)
        console.log(res.data)
      },
      onError: function(res) {
        console.log(res)
      },
      onComplete: function() {
        wx.hideLoading()
      }
    })
  },

  /**
   * 增加
   */
  addProp: function() {
    wx.navigateTo({
      url: "../editProp/editProp?type=add",
    })
  }
})