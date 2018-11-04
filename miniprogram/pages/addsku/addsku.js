// pages/addsku/addsku.js
var request = require("../../utils/request.js")
Page({
  isAdd: true,

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    props: [],
    isSelectComplete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var productStr = options.product
    var product = JSON.parse(productStr)
    var isHave = false
    if (!product.prop_list || product.prop_list.length == 0) {
      isHave = true
    }
    this.setData({
      product: product,
      props: product.prop_list,
      isSelectComplete: isHave
    })

    // this.getPropValues(product)
    this.isAdd = false


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
   * 获取规格值
   */
  getPropValues: function(product) {
    var list = []
    for (var i = 0; i < product.props.length; i++) {
      list.push(product.props[i]._id)
    }
    var propList = "[" + list.toString() + "]"
    var thisPage = this
    request.baseRequest({
      params: {
        prop_list: propList,
      },
      url: "prop/getAllPropValue.do",
      onStart: function() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        console.log(res.data)
        thisPage.setData({
          props: res.data
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
  clickPropItem: function(e) {
    var propList = this.data.props
    var propId = e.currentTarget.dataset.propId
    var propItemId = e.currentTarget.dataset.propItemId
    var prop = propList[propId].values[propItemId]
    for (var j = 0; j < propList[propId].values.length; j++) {
      propList[propId].values[j].isSelect = false
    }
    if (!prop.hasOwnProperty("isSelect") || !prop.isSelect) {
      propList[propId].isSelect = true
      prop.isSelect = true
    } else {
      propList[propId].isSelect = true
      prop.isSelect = false
    }
    this.setData({
      props: propList
    })

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
  },

  /**
   * 保存库存信息
   */
  saveProductInfo: function(e) {
    var propValues = []
    for (var i = 0; i < this.data.props.length; i++) {
      for (var j = 0; j < this.data.props[i].values.length; j++) {
        if (this.data.props[i].values[j].isSelect) {
          propValues.push(this.data.props[i].values[j]._id)
          break
        }
      }
    }
    // var propSelectStr = "[" + propValues.toString() + "]"

    var thisPage = this
    request.baseCloud({
      params: {
        product_id: thisPage.data.product._id,
        trade_price: e.detail.value.tradePrice,
        retail_price: e.detail.value.retailPrice,
        stock_count: e.detail.value.stockCount,
        prop_value_list: propValues
      },
      fun: "product",
      url: "createSku",
      onStart: function() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        console.log(res.data)
        wx.showToast({
          title: '增加成功',
          icon: "none"
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