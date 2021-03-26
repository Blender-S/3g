const { scheduler } = require('../../../utils/scheduler')
const { getCookies, saveCookies } = require('../../../utils/util')
const _request = require('../../../utils/request')

var start = async (params) => {
  const { cookies, options } = params

  let init = async (request, savedCookies) => {
    await require('./init')(request, {
      ...params,
      cookies: savedCookies || cookies
    })
    return {
      request
    }
  }
  let taskOption = {
    init
  }

// 首页-游戏-娱乐中心-每日打卡-完成今日任务(200m)
await scheduler.regTask('todayDailyTask', async (request) => {
    await require('./producGame').doTodayDailyTask(request, options)
  }, {
    ...taskOption,
    startTime: 10 * 3600
  })
}
  module.exports = {
    start
  }