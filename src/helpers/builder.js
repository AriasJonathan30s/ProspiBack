const { Promise } = require("mongoose");

const builder = {
    constructProds: (orders)=>{
        const newOrders = [];
        orders.forEach(vals=>{
            const newVals = {
                cxName: vals.cxName, employe: vals.employe, payMethod: vals.payMethod, change: vals.change,
                payQuant: vals.payQuant, price: vals.price, products: vals.products
            };
            if (vals.price === 0 && vals.status === 0) {
                newVals.status = 'Cancelado'
            }
            if (vals.price !== 0 && vals.status === 0) {
                newVals.status = 'Cerrado'
            }
            if (vals.price !== 0 && vals.status !== 0) {
                newVals.status = 'Abierto'
            }
            let prodQuant=0;
            vals.products.forEach(prod=>{
                prodQuant += prod.quant;
            })
            newVals.quant = prodQuant;
            newOrders.push(newVals);
        })
        return newOrders
    },
    rangeResm: (orders)=>{
        let totIncm = 0;
        let totProds = 0;
        const rngRsm = {totOrders: orders.length, totIncm: totIncm, prdsSold: totProds};
        orders.forEach(ord=>{
            totIncm += ord.price;
            let prodsCnt = 0;
            ord.products.forEach(prod=>{
                prodsCnt += prod.quant
            })
            totProds += prodsCnt;
        })
        rngRsm.totIncm = totIncm;
        rngRsm.prdsSold = totProds;
        return rngRsm
    },
    condmntGroup: (condsArr)=>{
        const conds = [];
        const condimentGrps = [];
        let condimentGrp = [];
        let grpQnt = 3;
        condsArr.forEach(cond=>{
            cond.conds.forEach(name=>{
                conds.push(name)
            })
        })
        if (conds.length <= 3) {
            condimentGrps = conds;
        } else {
            conds.forEach((name,index)=>{
                if (index < grpQnt) {
                    condimentGrp.push(name);
                    if (conds.length === index+1) {
                        condimentGrps.push(condimentGrp);
                    }
                } else {
                    condimentGrps.push(condimentGrp);
                    grpQnt += 3;
                    condimentGrp = [];
                    condimentGrp.push(name);
                }
            })
        }
        return condimentGrps;
    },
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