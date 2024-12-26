class productDTO {

    constructor(
        id,
        name,
        types,
        typeName,
        typeDetail,
    ) {
        this.id = id;
        this.name = name;
        this.types = types;
        this.typeName = typeName;
        this.typeDetail = typeDetail;
    }

    getId(){
        return this._id;
    }
    setId(newId){
        if (newId === '') {
            throw 'Campo vacio'
        } else {
            this._id = newId;
        }
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

    getTypes(){
        return this._types;
    }
    setTypes(newTypes){
        if (newTypes.length === 0) {
            throw 'Campo vacio'
        } else {
            this._types = newTypes;
        }
    }

    getProduct(){
        return {
            name: this._name,
            types: this._types
        }
    }
    setProduct(newProdObject){
        if (typeof(newProdObject) !== 'object') {
            throw 'No agregado'
        } else {
            this._id = newProdObject._id.toString();
            this._name = newProdObject.name;
            this._types = newProdObject.types;
        }
    }
    
}

module.exports = productDTO;