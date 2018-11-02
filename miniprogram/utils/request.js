module.exports = {
  baseRequest: baseRequest,
}

var serviceUrl = "http://localhost:8080/shop/"

/**
 * params: 参数对象
 *   data: 请求参数对象
 *   url: 请求url列表
 *   start: 开始回调
 *   success: 成功回调
 *   error: 失败回调
 *   complete: 完成回调
 */
function baseRequest(params) {
  // 设置公共参数
  var publicPar = {
    // 登录标示
    wx_id: "mlt",
    // 请求时间
    requestDate: new Date().getTime(),

  }
  // 拼接参数
  if (params.hasOwnProperty('params')) {
    Object.assign(publicPar, params.params)
  }
  // 判断是否传入url
  if (!params.hasOwnProperty('url')) {
    return
  }
  var requestUrl = serviceUrl + params.url
  // 判断是否有start回调
  if (params.hasOwnProperty("onStart") && typeof("params.onStart") == "function") {
    params.onStart()
  }
  console.log("访问接口：", requestUrl)
  console.log("访问参数：", publicPar)
  // 开始请求
  wx.request({
    url: requestUrl,
    data: publicPar,
    method: "GET",
    success: function(res) {
      console.log("接口回调：", res)
      if (params.hasOwnProperty("onComplete")) {
        params.onComplete()
      }
      if (res.data.code == 1) {
        if (params.hasOwnProperty("onSuccess")) {
          params.onSuccess(res.data)
        }
      } else {
        if (params.hasOwnProperty("onError")) {
          params.onError(res.data)
        }
      }
    },
    fail: function(errorInfo) {
      console.log(errorInfo)
      if (params.hasOwnProperty("onComplete")) {
        params.onComplete()
      }
      if (params.hasOwnProperty("onError")) {
        params.onError({
          msg: "网络异常，请重试",
          code: '-2'
        })
      }
    }
  })

}