const getDay = () => {
    let weekdays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
    let date = new Date()
    return weekdays[date.getDay()]
}

const getMonth = () => {
    let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    let date = new Date()
    return months[date.getMonth()]
}

const getDate = () => {
    let date = new Date()
    return date.getDate()
}

const day = document.getElementById('day')
const date = document.getElementById('today_date')

day.innerHTML = getDay()
date.innerHTML = `${getDate()} ${getMonth()}`