const security = require('../fetcher/secureFetch');

const productFood = require('../DTO/productFoodDTO');

const dao = require('../DAO/dao');
const builder = require('../helpers/builder');

module.exports = {
    getMenu:(products)=>{
        return Promise((resolve, reject)=>{
            console.log(products)
            resolve(0)
        })
    },
    editProduct:(token, id, product, detail, addlTypes)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        dao.findProdByID(id,{'$match':''})
                        .then( async gotProd=>{
                            const dbProd = new productFood();
                            dbProd.setProduct(await gotProd);
                            const reqProd = JSON.parse(product);
                            if (reqProd.name) {
                                dbProd.setName(reqProd.name);
                            }
                            const types = (dbProd.getTypes());
                            const typesNames = builder.extractNames(dbProd.getTypes());
                            if ((JSON.parse(addlTypes)).length) {
                                const newTypes = JSON.parse(addlTypes);
                                const nTypNames = builder.extractNames(newTypes);
                                const dsExist = nTypNames.map(name=>{
                                    if (typesNames.includes(name)) {
                                        return 1;
                                    }
                                })
                                dsExist.map((name,index)=>{
                                    if (typeof(name) === 'undefined') {
                                        types.push(newTypes[index])
                                    }
                                })
                                dbProd.setTypes(types);
                            } else {
                                const reqDet = JSON.parse(detail);
                                if (reqDet.name) {
                                    types[reqProd.index].name = reqDet.name;
                                }
                                if (reqDet.detail.length) {
                                    types[reqProd.index].detail = reqDet.detail;
                                }    
                            }
                            dao.updateProdByID(dbProd.getId(), dbProd.getProduct())
                            .then(resp=>{
                                resolve(1);
                            })
                            .catch(e=>{
                                console.warn('Edit product request error');
                                reject(e);
                            })
                        })
                        .catch(e=>{
                            console.warn('Find by id product request error');
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })
        })
    },
    getProducts:(token)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        const params = {};
                        const opts = {__v:0};
                        dao.getProducts(params, opts)
                        .then(resp=>{
                            resolve(resp)
                        })
                        .catch(e=>{
                            console.warn('Get product request error');
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })
        })
    },
    newProduct:(token, prod)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        const product = JSON.parse(prod);
                        dao.newProduct(product)
                        .then(resp=>{
                            resolve(0)
                        })
                        .catch(e=>{
                            console.warn('New product request error');
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })
        })
    },
    editCondiment:(token, condiment, id)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        const editCond = JSON.parse(condiment)
                        dao.updateCondById(id, editCond)
                        .then(resp=>{
                            resolve(1)
                        })
                        .catch(e=>{
                            console.warn('Edit condiment request error');
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })
        }) 
    },
    getCondiments:(token)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        const params = {};
                        const options = {__v:0};
                        dao.getCondiments(params, options)
                        .then(resp=>{
                            if (resp) {
                                resolve(resp);
                            } else {
                                reject(0)
                            }
                        })
                        .catch(e=>{
                            console.warn('New condiment request error');
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })

        }) 
    },
    newCondiment: (token, newCond)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        const cond = JSON.parse(newCond);
                        if (cond.type && cond.conds.length) {
                            dao.newCondiment(cond)
                            .then(resp=>{
                                if (resp) {
                                    resolve(0);    
                                } else {
                                    reject(0)
                                }
                            })
                            .catch(e=>{
                                console.warn('New condiment request error');
                                reject(e);
                            })
                        } else {
                            reject(1);
                        }
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })

        })
    }
}