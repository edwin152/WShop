// pages/product/product.js
var request = require("../../utils/request.js")
var stepList = []
var sizeList = []
var checkList = []
var sourceStr = ""
var productId = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 正在显示的商品图片
    showProductImageNumber: 1,
    productBean: {
      listImage: [
        "http://img.hhealth.cn/hm/static/public/goods/xc/1529373676944/1529373677320480720.jpg",
        "http://img.hhealth.cn/hm/static/public/goods/xc/1529373676944/1529373677320480720.jpg",
        "http://img.hhealth.cn/hm/static/public/goods/xc/1529373676944/1529373677320480720.jpg",
        "http://img.hhealth.cn/hm/static/public/goods/xc/1529373676944/1529373677320480720.jpg",
        "http://img.hhealth.cn/hm/static/public/goods/xc/1529373676944/1529373677320480720.jpg",
      ],
      name: "益普利生维生素C咀嚼片100片",
      price: "55.00",
      stock: "1000"
    },
    productCount: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    stepList = []
    sizeList = []
    checkList = []
    sourceStr = ""
    productId = options.productId
    this.getProductDetail()

    // var productStr = options.product
    // var product = JSON.parse(productStr)
    // sourceStr = product.unique

    // var stepNum = 1;
    // for (var i = 0; i < product.prop_list.length; i++) {
    //   if (i == 0) {
    //     stepList.push(stepNum)
    //   } else {
    //     stepNum = product.prop_list[i - 1].values.length * stepNum
    //     stepList.push(stepNum)
    //   }
    //   sizeList.push(product.prop_list[i].values.length)
    //   checkList.push(-1)
    // }
    // for (var i = 0; i < product.prop_list.length; i++) {
    //   for (var j = 0; j < product.prop_list[i].values.length; j++) {
    //     product.prop_list[i].values[j].isCanUse = this.isCanUse(0, 0, checkList, 0)
    //   }
    // }

    // this.setData({
    //   productBean: product
    // })
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
   * 加入购物车
   */
  addShopCart: function() {

    var propValues = []
    for (var i = 0; i < this.data.productBean.props.length; i++) {
      for (var j = 0; j < this.data.productBean.props[i].values.length; j++) {
        if (this.data.productBean.props[i].values[j].isSelect) {
          propValues.push(this.data.productBean.props[i].values[j].id)
          break
        }
      }
    }

    if (propValues.length <= 0){
      wx.showToast({
        title: '请选择规格',
        icon: "none"
      })
      return
    }
    var propSelectStr = "[" + propValues.toString() + "]"

    // console.log(this.data.productBean.skus[propSelectStr])

    var shopCartParms = "{ \"skuId\": \"" + this.data.productBean.sku_list[propSelectStr].id + "\", \"count\": \"" + this.data.productCount + "\", \"choose\": true }"
    console.log(shopCartParms)

    var thisPage = this
    request.baseRequest({
      params: {
        shop_cart: shopCartParms
      },
      url: "user/addCart.do",
      onStart: function () {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '添加成功',
          icon: "none"
        })
        // thisPage.setData({
        //   propList: res.data
        // })
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
   * 滑动商品主图片
   */
  changeShowImage: function(event) {
    // console.log(event)
    this.setData({
      showProductImageNumber: event.detail.current + 1
    })

  },
  /**
   * 浏览大图
   */
  maxImage: function(event) {
    var index = event.currentTarget.dataset.itemIndex
    var images = [];
    for (var i = 0; i < this.data.productBean.listImage.length; i++) {
      images.push(this.data.productBean.listImage[i])
    }
    wx.previewImage({
      current: images[index],
      urls: images,
    })
  },

  /**
   * 点击规格
   */
  clickPropItem: function(e) {
    var propList = this.data.productBean.prop_list
    var propId = e.currentTarget.dataset.propId
    var propItemId = e.currentTarget.dataset.propItemId
    var prop = propList[propId].values[propItemId]
    var isSelectIn = prop.hasOwnProperty("isSelect") && prop.isSelect
    for (var j = 0; j < propList[propId].values.length; j++) {
      if (j == propItemId) {
        propList[propId].values[j].isSelect = !isSelectIn
        propList[propId].isSelect = !isSelectIn
      } else {
        propList[propId].values[j].isSelect = false
      }
    }
    if (!isSelectIn) {
      // 记录选择数组
      checkList[propId] = parseInt(propItemId)
    } else {
      checkList[propId] = -1
    }

    var selectNumber = 0
    for (var i = 0; i < propList.length; i++) {
      if (propList[i].isSelect) {
        selectNumber++
      }
    }
    if (selectNumber == propList.length) {
      this.setData({
        isSelectComplete: true
      })
    }

    // 判断是否可选
    for (var i = 0; i < propList.length; i++) {
      if (i == propId) {
        continue
      }
      for (var j = 0; j < propList[i].values.length; j++) {
        var checkedList = [].concat(checkList)
        checkedList[i] = j
        var isCanUseThis = this.isCanUse(0, 0, checkedList, 0)
        propList[i].values[j].isCanUse = isCanUseThis
      }
    }



    var path = "productBean.prop_list"
    this.setData({
      [path]: propList
    })
  },

  /**
   * 判断某个规格是否可以选择
   */
  isCanUse: function(startRowIndex, startColIndex, checkList, flexValue) {
    // 结束条件
    if (startRowIndex >= checkList.length) {
      var charAStr = sourceStr.charAt(flexValue)
      return charAStr == '1'
    }

    if (startColIndex >= sizeList[startRowIndex]) {
      return false
    }

    // 计算变量
    var sel = checkList[startRowIndex] == -1 ? stepList[startRowIndex] * startColIndex : stepList[startRowIndex] * checkList[startRowIndex]
    // 递归
    return this.isCanUse(startRowIndex + 1, 0, checkList, flexValue + sel) || this.isCanUse(startRowIndex, startColIndex + 1, checkList, flexValue)
  },

  /**
   * 编辑商品数量
   */
  editProductCount:function(e){
    // console.log(e)
    this.setData({
      productCount: parseInt(e.detail.value)
    })
  },
  
  /**
   * 获取商品详情数据
   */
  getProductDetail: function(){
    let thisPage = this
    request.baseCloud({
      params: {
        _id: productId,
      },
      fun: "product",
      url: "getProductDetail",
      onStart: function () {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function (res) {
        console.log(res.data)
        var product = res.data
        sourceStr = product.unique

        var stepNum = 1;
        for (var i = 0; i < product.prop_list.length; i++) {
          if (i == 0) {
            stepList.push(stepNum)
          } else {
            stepNum = product.prop_list[i - 1].values.length * stepNum
            stepList.push(stepNum)
          }
          sizeList.push(product.prop_list[i].values.length)
          checkList.push(-1)
        }
        for (var i = 0; i < product.prop_list.length; i++) {
          for (var j = 0; j < product.prop_list[i].values.length; j++) {
            product.prop_list[i].values[j].isCanUse = thisPage.isCanUse(0, 0, checkList, 0)
          }
        }
        thisPage.setData({
          productBean: product
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