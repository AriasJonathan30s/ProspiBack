class businessDTO {

    constructor(
        name,
        role,
        scheduleDaysStart,
        scheduleDaysEnd,
        scheduleHoursStart,
        scheduleHoursEnd,
        address,
        zipcode,
        owner,
        fundationDate
    ) {
        this.name = name;
        this.role = role;
        this.scheduleDaysStart = scheduleDaysStart;
        this.scheduleDaysEnd = scheduleDaysEnd;
        this.scheduleHoursStart = scheduleHoursStart;
        this.scheduleHoursEnd = scheduleHoursEnd;
        this.address = address;
        this.zipcode = zipcode;
        this.owner = owner;
        this.fundationDate = fundationDate;
    }

    getName(){
        return this._name;
    }
    setName(newName){
        if (newName === '') {
            throw 'Campo vacio'
        } else {
            this._name = newName;
        }
    }

    getRole(){
        return this._role;
    }
    setRole(newRole){
        if (newRole === '') {
            throw 'Campo vacio'
        } else {
            this._role = newRole;
        }
    }

    getScheduleDaysStart(){
        return this._scheduleDaysStart;
    }
    setScheduleDaysStart(newScheduleDaysStart){
        if (newScheduleDaysStart === '') {
            throw 'Campo vacio'
        } else {
            this._scheduleDaysStart = newScheduleDaysStart;
        }
    }

    getScheduleDaysEnd(){
        return this._scheduleDaysEnd;
    }
    setScheduleDaysEnd(newScheduleDaysEnd){
        if (newScheduleDaysEnd === '') {
            throw 'Campo vacio'
        } else {
            this._scheduleDaysEnd = newScheduleDaysEnd;
        }
    }

    getScheduleHoursStart(){
        return this._scheduleHoursStart;
    }
    setScheduleHoursStart(newScheduleHoursStart){
        if (newScheduleHoursStart === '') {
            throw 'Campo vacio'
        } else {
            this._scheduleHoursStart = newScheduleHoursStart;
        }
    }

    getScheduleHoursEnd(){
        return this._scheduleHoursEnd;
    }
    setScheduleHoursEnd(newScheduleHoursEnd){
        if (newScheduleHoursEnd === '') {
            throw 'Campo vacio'
        } else {
            this._scheduleHoursEnd = newScheduleHoursEnd;
        }
    }

    getAddress(){
        return this._address;
    }
    setAddress(newAddress){
        if (newAddress === '') {
            throw 'Campo vacio'
        } else {
            this._address = newAddress;
        }
    }

    getZipcode(){
        return this._zipcode;

    }
    setZipcode(newZipcode){
        if (newZipcode === '') {
            throw 'Campo vacio'
        } else {
            this._zipcode = newZipcode;
        }
    }

    getOwner(){
        return this._owner;

    }
    setOwner(newOwner){
        if (newOwner === '') {
            throw 'Campo vacio'
        } else {
            this._owner = newOwner;
        } 
    }

    getFundationDate(){
        return this._fundationDate;

    }
    setFundationDate(newFundationDate){
        if (newFundationDate === '') {
            throw 'Campo vacio'
        } else {
            this._fundationDate = newFundationDate;
        }
    }

    business(jsonObject){
            this._name = jsonObject.name,
            this._role = jsonObject.role,
            this._scheduleDaysStart = jsonObject.scheduleDaysStart,
            this._scheduleDaysEnd = jsonObject.scheduleDaysEnd,
            this._scheduleHoursStart = jsonObject.scheduleHoursStart,
            this._scheduleHoursEnd = jsonObject.scheduleHoursEnd,
            this._address = jsonObject.address,
            this._zipcode = jsonObject.zipcode,
            this._owner = jsonObject.owner,
            this._fundationDate = jsonObject.fundationDate
    }

    getBusiness(){
        return {
            name: this._name, role: this._role, scheduleDaysStart: this._scheduleDaysStart, scheduleDaysEnd: this._scheduleDaysEnd,
            scheduleHoursStart: this._scheduleHoursStart, scheduleHoursEnd: this._scheduleHoursEnd, address: this._address,
            zipcode: this._zipcode, owner: this._owner, fundationDate: this._fundationDate
        }
    }
    
}

module.exports = businessDTO;