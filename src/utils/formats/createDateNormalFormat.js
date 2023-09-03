const dayjs = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat')
const monthNames = require('./monthNames')
const monthNamesInd = require('./monthNamesInd')
const dayNamesEng = require('./dayNamesEng')
const dayNamesInd = require('./dayNamesInd')

const createDateNormalFormat = (date, offDays) => {
    if (date) {
        dayjs.extend(localizedFormat)
        const localFormatDay = dayjs(date).format('ddd')?.toLowerCase()
        const getMonth = dayjs(date).format('MMM')
        const localFormatDate = dayjs(date).format('LL')?.replace(',', '')?.split(' ')

        const getDate = localFormatDate[1].length === 1 ? `0${localFormatDate[1]}` : localFormatDate[1]

        const findMonthIdx = monthNames.findIndex(month => month === getMonth)
        const monthInd = monthNamesInd.find((month, index) => index === findMonthIdx)

        const findDayIdx = dayNamesEng.findIndex(day => day === localFormatDay)
        const findDayInd = dayNamesInd.find((day, index) => index === findDayIdx)
        const dayInd = `${findDayInd?.substr(0, 1)?.toUpperCase()}${findDayInd?.substr(1, findDayInd.length - 1)}`

        return offDays ? `${monthInd} ${getDate} ${localFormatDate[2]}` : `${monthInd} ${getDate} ${localFormatDate[2]}, ${dayInd}`
    }
    return ''
}

const createDateFormat = (
    currentDate,
    format = 'MM/DD/YYYY'
)=>{
    const days = dayjs(currentDate).format(format)
    return days
}

module.exports = { createDateNormalFormat, createDateFormat }