// pages/editProp/editProp.js
var request = require("../../utils/request.js")
var pageType = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prop: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    if (options.type == "add") {
      pageType = 1
      this.setData({
        prop: {
          name: "",
          values: [{
            name: ""
          }]
        }
      })
    } else {
      var bean = JSON.parse(options.prop)
      this.setData({
        prop: bean
      })
    }

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
   * 保存修改
   */
  saveProp: function(e) {
    console.log(e)
    var propName = e.detail.value.title
    var values = []
    var path = "value"
    for (var i = 0; i < 65535; i++) {
      var pathi = path + i;
      if (e.detail.value.hasOwnProperty(pathi)) {
        var bean = e.detail.value[pathi]
        if (bean.length > 0) {
          values.push(bean)
        }
      } else {
        break
      }
    }
    console.log(values)

  },

  /**
   * 保存规格
   */
  saveTitle: function(e) {
    if (e.detail.value.title.length <= 0) {
      wx.showToast({
        title: '没有修改',
        icon: "none"
      })
      reutrn
    }
    if (pageType == 1) {
      this.addProp(e.detail.value.title)
    } else {
      this.editProp(this.data.prop.id, e.detail.value.title)
    }
  },
  /**
   * 保存规格值
   */
  saveValue: function(e) {
    // console.log(e)
    if (e.detail.value.value.length <= 0) {
      wx.showToast({
        title: '没有修改',
        icon: "none"
      })
      return
    }
    if (e.detail.value.id.length <= 0) {
      this.addPropValue(e.detail.value.value)
    } else {
      this.editPropValue(e.detail.value.id, e.detail.value.value)
    }
  },

  /**
   * 删除规格
   */
  deleteProp: function(e) {
    if (!e.currentTarget.dataset.id) {
      return
    }
    // wx.cloud.callFunction({
    //   name: "prop",
    //   data: {
    //     name: "deleteProp",
    //     data: {
    //       _id: e.currentTarget.dataset.id,
    //     }
    //   },
    //   success: function(res){
    //     console.log(res)
    //   }
    // })

    var thisPage = this
    request.baseCloud({
      params: {
        _id: e.currentTarget.dataset.id
      },
      fun: "prop",
      url: "deleteProp",
      onStart() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        wx.showToast({
          title: '删除成功',
          icon: "none"
        })
        wx.navigateBack({
          
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
   * 删除属性值
   */
  deletePropValue: function (e) {
    if (!e.currentTarget.dataset.id) {
      return
    }
    var thisPage = this
    request.baseCloud({
      params: {
        _id: e.currentTarget.dataset.id
      },
      fun: "prop",
      url: "deletePropValue",
      onStart() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function (res) {
        if (thisPage.data.prop.values) {
          var list = thisPage.data.prop.values
          list.splice(e.currentTarget.dataset.itemIndex, 1)
          var path = "prop.values"
          thisPage.setData({
            [path]: list
          })
        }
      },
      onError: function (res) {
        console.log(res.msg)
      },
      onComplete: function () {
        wx.hideLoading()
      }
    })
  },

  /**
   * 添加输入框
   */
  addInput: function(e) {
    var path = "prop.values"
    if (this.data.prop.hasOwnProperty("values") && this.data.prop.values.length > 0) {
      if (this.data.prop.values[this.data.prop.values.length - 1].name.length <= 0){
        return
      }
      var list = this.data.prop.values
      list.push({
        name: ""
      })
      this.setData({
        [path]: list
      })
    } else {
      var bean = this.data.prop
      Object.assign(bean, {
        values: [{
          name: ""
        }]
      })
      this.setData({
        prop: bean
      })
    }
  },

  /**
   * 添加规格名称
   */
  addProp: function(name) {
    var thisPage = this
    request.baseCloud({
      params: {
        name: name
      },
      fun: "prop",
      url: "createProp",
      onStart() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        thisPage.setData({
          prop: res.data
        })
        wx.showToast({
          title: '保存成功',
          icon: "none"
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
   * 编辑规格名称
   */
  editProp: function (id, name) {

    var thisPage = this
    request.baseCloud({
      params: {
        _id: id,
        name: name
      },
      fun: "prop",
      url: "editProp",
      onStart() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        wx.showToast({
          title: '保存成功',
          icon: "none"
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
   * 添加规格值
   */
  addPropValue: function (name) {
    var thisPage = this
    request.baseCloud({
      params: {
        prop_id: thisPage.data.prop._id,
        name: name
      },
      fun: "prop",
      url: "createPropValue",
      onStart() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        var propList = thisPage.data.prop.values
        for (var i = 0; i <  propList.length; i++){
          if (propList[i].name.length <= 0){
            propList[i] = res.data
          }
        }
        thisPage.setData({
          ["prop.values"]: propList
        })
        wx.showToast({
          title: '保存成功',
          icon: "none"
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
   * 编辑规格值
   */
  editPropValue: function (id, name) {
    var thisPage = this
    request.baseCloud({
      params: {
        _id: id,
        name: name
      },
      fun: "prop",
      url: "editPropValue",
      onStart() {
        wx.showLoading({
          title: '',
        })
      },
      onSuccess: function(res) {
        // var bean = res.result
        // thisPage.setData({
        //   prop: res.result
        // })
        wx.showToast({
          title: '保存成功',
          icon: "none"
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
})