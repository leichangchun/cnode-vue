
/**
 * 获取子项的类型信息
 * @method getTabInfo
 * @param  {string}   tab       类型
 * @param  {boolean}   good     是否是精品
 * @param  {boolean}   top      是否置顶
 * @param  {boolean}   isClass 是否返回样式名
 * @return {String}             [description]
 */
export function getTabInfo (tab, good, top, isClass) {
  let className = ''
  let type = ''

  if (top) {
    type = '置顶'
    className = 'top'
  } else if (good) {
    type = '精品'
    className = 'good'
  } else {
    switch (tab) {
      case 'share':
        type = '分享'
        className = 'share'
        break
      case 'ask':
        type = '问答'
        className = 'ask'
        break
      case 'job':
        type = '招聘'
        className = 'job'
        break
      default:
        type = '暂无'
        className = 'none'

    }
  }

  return isClass ? className : type
}

// export function formatDate (date) {
//   let timeAgo = timeago()
//   return timeAgo.format(date)
// }
