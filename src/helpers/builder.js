const builder = {
    buildProd: (param,prod)=>{
        let newProd = { id: (prod._id.toString()), name: prod.name };
        prod.types.map(type=>{
            if (type.name === param) {
                newProd.type = type.name;
                newProd.price = type.price;
                newProd.detail = builder.detailToString(type.detail);
                newProd.dtlArr = type.detail;
            }
        })
        return newProd;
    },
    detailToString: (detail)=>{
        let strDetail = '';
        const lastPos = (detail.length)-1;
        const andPos = (detail.length)-2;
        for (let i = 0; i < detail.length; i++) {
            if (i === lastPos) {
                strDetail += detail[i]+'.';
            } else if (i === andPos) {
                strDetail += detail[i]+' y ';
            } else {
                strDetail += detail[i]+', ';
            }
        }
        return strDetail;
    },
    extractNames: (object)=>{
        return object.map(extract=>{
            return extract.name
        })
    },
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

module.exports = builder;