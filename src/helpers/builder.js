module.exports = {
    timeFormater: (time)=>{
        const timeArr = time.split(':');
        const timeFrame = ['AM', 'PM'];
        const formatedTime = '';
        if (parseInt(timeArr[0]) >= 0 && parseInt(timeArr[0]) <= 11) {
            const morningHour = parseInt(timeArr[0]) == 0 ? '12' : timeArr[0];
            return formatedTime.concat(morningHour+':'+timeArr[1]+timeFrame[0])
        } else {
            return formatedTime.concat(timeArr[0]+':')+timeArr[1]+timeFrame[1]
        }
    },
    weekDayGetter: (date)=>{
        const weekDay = new Date(date);
        return weekDay.getDay();

    },
    dateGetter: (date)=>{
        return new Date(date);
    }
}