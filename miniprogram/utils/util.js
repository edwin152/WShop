const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}


// selectList = [-1, -1, -1]
// weightList = [1, 3, 6]

function mlt() {
  // for (var i = 0; i < weightList.length; i++) {
  //   for (var j = 0; j < propList[i].values.length; j++) {
  //     var indexFlxe = 0
  //     for (var n = 0; n < weightList.length; n++) {
  //       if (n != i) {
  //         indexFlxe = weightList[n] * i
  //       }
  //     }
  //     var a = weightList[i] * j + indexFlxe
  //   }
  // }

  /**
   * 定值的乘数： propList[?].value.length
   * 动值的数：   propList[?].value.length
   * 
   */

  // // 计算第几位
  // for (var i = 0; i < weightList.length; i++) {

  // }

  /**
   * 0： 动值： 每次+1
   * 1： weight中正在计算的下标的值
   * 0： 定值:  每个循环+1
   * 3： weight中没有计算的下标的值
   * 0： 定值:  每个循环+1
   * 6： weight中没有计算的下标的值
   */

  // // 未选中的prop的value的长度,选中的为-1
  // noneList = [3,2,4]
  // // 需要的下标数
  // 24
  // // 值
  // [0,1,2,3,...,23]

  var noneList = [3, 2, 4]
  var weight = [1, 3, 6]

var resultList = []
  for (var i = 0; i < noneList.length; i++){
    if (noneList[i] != -1){
      // 计算中的乘数
      for (var j = 0; j < noneList[i]; j++){
        // 求和
        for (var n = 0; n < weight.length; n++){
          var result = 0
          if (n == j){
            result += weight[n] * j
          }else{
            result += weight[n] * i
          }
        }
        resultList.push(result)
      }
    }
  }
  console.log(resultList)
}