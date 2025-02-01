class businessDTO {

    constructor(
        cxName,
        products,
        requesDateHour,
        price,
        payQuant,
        payMethod,
        change,
        status,
        employe
    ) {
        this.cxName = cxName
        this.products = products
        this.requesDateHour = requesDateHour
        this.price = price
        this.payQuant = payQuant
        this.payMethod = payMethod
        this.change = change
        this.status = status
        this.employe = employe
    }

    getCxName(){
        return this._cxName;
    }
    setCxName(newCxName){
        if (newCxName === '') {
            throw 'Campo vacio'
        } else {
            this._cxName = newCxName;
        }
    }

    getProducts(){
        return this._products;
    }
    setProducts(newProducts){
        if (newProducts === '') {
            throw 'Campo vacio'
        } else {
            this._products = newProducts;
        }
    }

    getRequesDateHour(){
        return this._requesDateHour;
    }
    setRequesDateHour(newRequesDateHour){
        if (newRequesDateHour === '') {
            throw 'Campo vacio'
        } else {
            this._requesDateHour = newRequesDateHour;
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

    getPayQuant(){
        return this._payQuant;
    }
    setPayQuant(newPayQuant){
        if (newPayQuant === '') {
            throw 'Campo vacio'
        } else {
            this._payQuant = newPayQuant;
        }
    }

    getPayMethod(){
        return this._payMethod;
    }
    setPayMethod(newPayMethod){
        if (newPayMethod === '') {
            throw 'Campo vacio'
        } else {
            this._payMethod = newPayMethod;
        }
    }

    getChange(){
        return this._change;
    }
    setChange(newChange){
        if (newChange === '') {
            throw 'Campo vacio'
        } else {
            this._change = newChange;
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

    getEmploye(){
        return this._employe;
    }
    setEmploye(newEmploye){
        if (newEmploye === '') {
            throw 'Campo vacio'
        } else {
            this._employe = newEmploye;
        }
    }

    getCnclOrd(){
        return {
            price: 0, payQuant: 0, payMethod: 'Cancelado', change: 0, status: 0
        }
    }
}

module.exports = businessDTO;