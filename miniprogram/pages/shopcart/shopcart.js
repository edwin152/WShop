// pages/shopcart/shopcart.js
var request = require("../../utils/request.js")
var editIndex = -1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editDialogIsShow: false,
    shopCartList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.getShopCartInfo()
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
   * 获取购物车数据
   */
  getShopCartInfo: function() {
    var thisPage = this
    request.baseCloud({
      params: {},
      fun: "user",
      url: "getCart",
      onStart: function() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        console.log(res.data)
        thisPage.setData({
          shopCartList: res.data
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
   * 显示修改购物车数量弹框
   */
  editNumberShow: function(e) {
    this.setData({
      editDialogIsShow: true
    })
    editIndex = e.currentTarget.dataset.itemIndex
  },

  /**
   * 关闭修改购物车数量弹框
   */
  closeDialog: function(e) {
    this.setData({
      editDialogIsShow: false
    })
  },

  /**
   * 修改购物车数量
   */
  editNumber: function(e) {
    var bean = this.data.shopCartList[editIndex]
    var productCount = e.detail.value.count
    if (productCount.length <= 0) {
      wx.showToast({
        title: '请输入数量',
        icon: "none"
      })
      return
    }
    this.editCartInfo(bean.sku_id, productCount, bean.choosen)
    // var shopCartStr = "{ \"sku\": \"" + bean.skus[propSelectStr].id + "\", \"count\": \"" + productCount + "\", \"choose\": true }"
    // var thisPage = this
    // request.baseCloud({
    //   params: {
    //     sku_id: bean.sku_id,
    //     count: productCount,
    //     choosen: bean.choosen
    //   },
    //   fun: "user",
    //   url: "editCart",
    //   onStart: function() {
    //     wx.showLoading({
    //       title: '',
    //     })
    //   },
    //   onSuccess: function(res) {
    //     console.log(res.data)
    //     thisPage.setData({
    //       editDialogIsShow: false,
    //       shopCartList: res.data
    //     })
    //   },
    //   onError: function(res) {
    //     console.log(res)
    //     wx.showToast({
    //       title: res.msg,
    //       icon: "none"
    //     })
    //   },
    //   onComplete: function() {
    //     wx.hideLoading()
    //   }
    // })

  },

  goPay: function() {
    var thisPage = this
    request.baseRequest({
      params: {},
      url: "order/createOrder.do",
      onStart: function() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        console.log(res.data)
        // thisPage.setData({
        //   editDialogIsShow: false
        // })
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
   * 用户登录
   */
  userLogin: function() {
    let thisPage = this
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function(user) {
        request.baseCloud({
          params: {
            avatar: user.userInfo.avatarUrl,
            name: user.userInfo.nickName,
          },
          fun: "user",
          url: "login",
          onStart: function() {
            wx.showLoading({
              title: '',
            })
          },
          onSuccess: function(res) {
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
          onError: function(res) {
            console.log(res)
            wx.showToast({
              title: '登录失败',
            })
          },
          onComplete: function() {
            wx.hideLoading()
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 判断用户是否授权
   */
  isRegister: function() {
    let thisPage = this
    wx.getSetting({
      success: function(res) {
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
  },

  /**
   * 选择商品
   */
  selectProduct: function(e) {
    var index = e.currentTarget.dataset.index
    var select = e.currentTarget.dataset.select
    var bean = this.data.shopCartList[index]
    // bean.choosen = !select
    // this.setData({
    //   ["shopCartList[" + index + "]"]: bean
    // })
    this.editCartInfo(bean.sku_id, bean.count, !select)
  },

  deleteProduct:function(e){
    var index = e.currentTarget.dataset.index
    var bean = this.data.shopCartList[index]
    var thisPage = this
    request.baseCloud({
      params: {
        sku_id: bean.sku_id,
      },
      fun: "user",
      url: "deleteCart",
      onStart: function () {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function (res) {
        console.log(res.data)
        thisPage.setData({
          editDialogIsShow: false,
          shopCartList: res.data
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
   * 编辑购物车
   */
  editCartInfo: function(sku_id, count, choosen) {
    var thisPage = this
    request.baseCloud({
      params: {
        sku_id: sku_id,
        count: count,
        choosen: choosen
      },
      fun: "user",
      url: "editCart",
      onStart: function() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        console.log(res.data)
        thisPage.setData({
          editDialogIsShow: false,
          shopCartList: res.data
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
  }
})