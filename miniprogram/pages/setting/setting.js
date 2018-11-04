// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 进入规格管理页面
   */
  specListPage: function(e){
    wx.navigateTo({
      url: '../speclist/speclist',
    })
  },
  /**
   * 商品管理
   */
  productList: function(e){
    wx.navigateTo({
      url: '../productList/productList',
    })
  },
  /**
   * 添加商品
   */
  addProduct: function(){
    wx.navigateTo({
      url: '../addproduct/addproduct',
    })
  },
  /**
   * 库存管理
   */
  stockManage:function(){
    wx.navigateTo({
      url: '../addproduct/addproduct',
    })
  },


  /**
   * 用户登录
   */
  userLogin: function () {
    let thisPage = this
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function (user) {
        request.baseCloud({
          params: {
            avatar: user.userInfo.avatarUrl,
            name: user.userInfo.nickName,
          },
          fun: "user",
          url: "login",
          onStart: function () {
            wx.showLoading({
              title: '',
            })
          },
          onSuccess: function (res) {
            wx.showToast({
              title: '登录成功',
              icon: "none"
            })
            thisPage.setData({
              loginDialog: false
            })
            wx.showTabBar({

            })
          },
          onError: function (res) {
            console.log(res)
            wx.showToast({
              title: '登录失败',
            })
          },
          onComplete: function () {
            wx.hideLoading()
          }
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 判断用户是否授权
   */
  isRegister: function () {
    let thisPage = this
    wx.getSetting({
      success: function (res) {
        // res.authSetting.scope.userInfo
        if (res.authSetting["scope.userInfo"])
          return
        wx.hideTabBar({

        })
        thisPage.setData({
          loginDialog: true
        })
      }
    })
  }
})