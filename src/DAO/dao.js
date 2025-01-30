const builder = require('../models/mongoosebuilder');

const users = require('../models/prospiUsers');
const business = require('../models/prospiBusiness');
const condiments = require('../models/prospiCondiments');
const products = require('../models/prospiProducts');
const orders = require('../models/prospiOrders');

module.exports = {
    updateAllOrders:(params,opts)=>{
        return new Promise((resolve, reject) => {
            orders.updateMany(params,opts)
            .then(resp=>{
                resolve(resp)
            })
            .catch(e=>{
                reject(e);
            })    
        })
    },
    getOrders: (params,opts)=>{
        return new Promise((resolve, reject) => {
            orders.find(params, opts)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Get orders Query error ' + e);
                reject(e);
            })
        })
    },
    updateOrderById:(id, prods)=>{
        return new Promise((resolve, reject) => {
            orders.findByIdAndUpdate(id, prods)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Get order by Id Query error ' + e);
                reject(e);
            })
        })
    },
    getOrderById: (id, opts)=>{
        return new Promise((resolve, reject) => {
            orders.findById(id, opts)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Get order by Id Query error ' + e);
                reject(e);
            })
        })
    },
    getOrder: (params, opts)=>{
        return new Promise((resolve, reject) => {
            orders.findOne(params, opts)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Get order Query error ' + e);
                reject(e);
            })
        })
    },
    regNewOrder: (order)=>{
        return new Promise((resolve, reject) => {
            const newOrder = orders(order);
            newOrder.save()
            .then(saved=>{
                resolve(saved);
            })
            .catch(e=>{
                console.warn('New order Query error ' + e);
                reject(0);
            })
        })
    },
    updateProdByID: (id, prod)=>{
        return new Promise((resolve, reject) => {
            products.findByIdAndUpdate(id,prod)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Update product by Id Query error ' + e);
                reject(e);
            })
        })
    },
    findProdByID: (id)=>{
        return new Promise((resolve, reject) => {
            products.findById(id)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Get products Query error ' + e);
                reject(e);
            })
        })
    },
    getProducts: (params, opts)=>{
        return new Promise((resolve, reject) => {
            products.find(params, opts)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Get products Query error ' + e);
                reject(e);
            })
        })
    },
    newProduct: (product)=>{
        return new Promise((resolve, reject) => {
            const newProduct = products(product);
            newProduct.save()
            .then(saved=>{
                resolve(saved);
            })
            .catch(e=>{
                console.warn('New product Query error ' + e);
                reject(0);
            })
        })
    },
    updateCondById: (id, params)=>{
        return new Promise((resolve, reject) => {
            condiments.findByIdAndUpdate(id,params)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Update condiment by Id Query error ' + e);
                reject(e);
            })
        })
    },
    getCondiments: (params, opts)=>{
        return new Promise((resolve, reject) => {
            condiments.find(params,opts)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Get condiments Query error ' + e);
                reject(e);
            })
        })
    },
    newCondiment: (condiment)=>{
        return new Promise((resolve, reject) => {
            const newCondiment = condiments(condiment);
            newCondiment.save()
            .then(saved=>{
                resolve(saved);
            })
            .catch(e=>{
                console.warn('New condiment Query error ' + e);
                reject(0);
            })
        })
    },
    updateBsnsById: (id, params)=>{
        return new Promise((resolve, reject) => {
            business.findByIdAndUpdate(id, params)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Update business by id Query error ' + e);
                reject(e);
            })
        })
    },
    getBsnesses:(params,opts)=>{
        return new Promise((resolve, reject) => {
            business.find(params,opts)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Get businesses Query error ' + e);
                reject(e);
            })
        })
    },
    regBsnss:(profile)=>{
        return new Promise((resolve, reject) => {
            const newBusiness = business(profile);
            newBusiness.save()
            .then(saved=>{
                resolve(saved);
            })
            .catch(e=>{
                console.warn('New business Query error ' + e);
                reject(0);
            })
        })
    },
    eraseUser: (param)=>{
        return new Promise((resolve, reject) => {
            users.findOneAndDelete(param)
            .then(erased=>{
                resolve(erased);
            })
            .catch(e=>{
                console.warn('Erase user Query error ' + e);
                reject(e);
            })
        })
    },
    updateUserById: (id,vals)=>{
        return new Promise((resolve, reject) => {
            users.findByIdAndUpdate(id,vals)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Update user Query error ' + e);
                reject(0);
            })
        })
    },
    getUsers: (param, opt)=>{
        return new Promise((resolve, reject) => {
            users.find(param,opt)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Get user Query error ' + e);
                reject(0);
            })
        })
    },
    getUser: (param, opt)=>{
        return new Promise((resolve, reject) => {
            users.findOne(param, opt)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Get user Query error ' + e);
                reject(0);
            })
        })
    },
    newUser: (reg)=>{
        return new Promise((resolve, reject) => {
            const newUser = users(reg)
            newUser.save()
            .then(saved=>{
                resolve(saved);
            })
            .catch(e=>{
                console.warn('New user Query error ' + e);
                reject(0);
            })
        })
    },
    genObjId: (id)=>{
        return new Promise((resolve, reject) => {
            builder.id(id)
            .then(resp=>{
                resolve(resp);
            })
            .catch(e=>{
                reject(e)
            })
        }) 
    }
}