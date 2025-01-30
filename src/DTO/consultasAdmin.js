class businessDTO {

    constructor(
        start,
        end,
        price,
        status
    ) {
        this.start = start;
        this.end = end;
        this.price = price;
        this.status = status;
    }

    getStartDate(){
        return this._start;
    }
    setStartDate(newStart){
        if (newStart === '') {
            throw 'Campo vacio'
        } else {
            this._start = newStart;
        }
    }

    getEndDate(){
        return this._end;
    }
    setEndDate(newEnd){
        if (newEnd === '') {
            throw 'Campo vacio'
        } else {
            this._end = newEnd;
        }
    }

    getprice(){
        return this._price;
    }
    setprice(newPrice){
        if (newPrice === '') {
            throw 'Campo vacio'
        } else {
            this._price = newPrice;
        }
    }

    getStatus(){
        return this._status;
    }
    setStatus(newStatus){
        if (newStatus === '') {
            throw 'Campo vacio'
        } else {
            this._status = newStatus;
        }
    }

    getRange(){
        return {
            requesDateHour: {
                "$gt": this._start,
                "$lt": this._end
            }
        }
    }

    getRangeFilterNotInc(){
        return {
            requesDateHour: {
                "$gt": this._start,
                "$lt": this._end
            },
            price: { "$ne": this._price },
            status: { "$ne": this._status }
        }
    }
}

module.exports = businessDTO;