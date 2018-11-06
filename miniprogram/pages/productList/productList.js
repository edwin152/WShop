// pages/productList/productList.js
var request = require("../../utils/request.js")
var imageIndexs = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getProductList()
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
   * 获取商品列表
   */
  getProductList: function() {
    var thisPage = this
    request.baseCloud({
      params: {},
      fun: "product",
      url: "getAllProduct",
      onStart() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        thisPage.setData({
          productList: res.data
        })
      },
      onError: function(res) {
        console.log(res.msg)
      },
      onComplete: function() {
        wx.hideLoading()
      }
    })
  },
  /**
   * 编辑商品
   */
  editProduct: function(e) {
    var product = this.data.productList[e.currentTarget.dataset.index]
    var productStr = JSON.stringify(product)
    wx.navigateTo({
      url: '../editproduct/editproduct?product=' + productStr,
    })
  },
  /**
   * 管理库存
   */
  manageStock: function(e) {
    var product = this.data.productList[e.currentTarget.dataset.index]
    var productStr = JSON.stringify(product)
    wx.navigateTo({
      url: '../managesku/managesku?product=' + productStr,
    })
  },

  /**
   * 删除商品
   */
  deleteProduct: function(e) {
    let thisPage = this
    wx.showModal({
      title: '删除商品',
      content: '删除后不可恢复，确定删除吗？',
      success: function(res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.productId
          request.baseCloud({
            params: {
              _id: id
            },
            fun: "product",
            url: "deleteProduct",
            onStart() {
              wx.showLoading({
                title: '',
              })
            },
            onSuccess: function(res) {
              thisPage.getProductList()
            },
            onError: function(res) {
              console.log(res.msg)
            },
            onComplete: function() {
              wx.hideLoading()
            }
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '出错了，请重试',
          icon: "none"
        })
      }
    })
  },

  /**
   * 滑动图片
   */
  changeImageIndex: function(e) {
    // console.log(e)
    imageIndexs[e.currentTarget.dataset.imageIndex] = e.detail.current
  },

  /**
   * 添加图片
   */
  addImage: function(e) {
    let thisPage = this
    var productIndex = e.currentTarget.dataset.productIndex
    var product = this.data.productList[productIndex]
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: "original",
      sourceType: "album",
      success: function(res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        const cloudPath = new Date().getTime() + filePath.match(/\.[^.]+?$/)[0]

        // 上传图片
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            // 获取图片地址
            var imageUrl = res.fileID
            var imageList = product.image_list
            imageList.push(imageUrl)
            // 更新商品
            request.baseCloud({
              params: {
                _id: product._id,
                name: product.name,
                image_list: imageList
              },
              fun: "product",
              url: "editProduct",
              onStart: function() {},
              onSuccess: function(res) {
                // console.log(res.data)
                thisPage.setData({
                  ["productList[" + productIndex + "]"]: res.data
                })
                wx.showToast({
                  title: '保存成功',
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
              }
            })

          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.hideLoading()
            wx.showToast({
              title: '上传失败，请重试',
              icon: "none"
            })
          },
          complete: () => {}
        })
      },
      fail: function() {

      }
    })
  },

  /**
   * 删除图片
   */
  deleteImage: function(e) {
    let thisPage = this
    var productIndex = e.currentTarget.dataset.productIndex
    var product = this.data.productList[productIndex]
    var imageList = product.image_list
    var deleteIndex = imageIndexs[productIndex]
    imageList.splice(deleteIndex, 1)
    wx.showModal({
      title: '删除图片',
      content: '图片删除后不可恢复，确定要删除吗？',
      success: function(res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.productId
          request.baseCloud({
            params: {
              _id: product._id,
              name: product.name,
              image_list: imageList
            },
            fun: "product",
            url: "editProduct",
            onStart: function() {
              wx.showLoading({
                title: '',
              })
            },
            onSuccess: function(res) {
              // console.log(res.data)
              thisPage.setData({
                ["productList[" + productIndex + "]"]: res.data,
                swiperIndex: 0
              })
              wx.showToast({
                title: '成功',
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
            }
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '出错了，请重试',
          icon: "none"
        })
      }
    })

  }
})