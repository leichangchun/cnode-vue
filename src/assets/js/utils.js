import timeago from 'timeago.js'
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

/**
 * 返回传入时间距离现在的人性化时间提示
 * @method timeAgo
 * @param  {String} date 时间字符串
 * @return {String}      时间提示
 */
function timeAgo (date) {
  let timeAgo = timeago()
  return timeAgo.format(date, 'zh_CN')
}

function resolveDate (date) {

}

/**
 * 格式化时间
 * @method formatDate
 * @param  {String}   date      时间字符串
 * @param  {Boolean}  humanity  是否返回人性化提示
 * @return {String}             格式化后的展示
 */
export function formatDate (date, humanity) {
  if (humanity) {
    return timeAgo(date)
  } else {
    resolveDate(date)
  }
}
