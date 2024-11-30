const mongoose = require("../DAO/daoConn");

module.exports = {
    id: (usrId)=>{
        return new Promise((resolve, reject) => {
            if (typeof(usrId) === 'string') {
                resolve(new mongoose.Types.ObjectId(usrId));
            } else {
                console.warn('Object Id builder error');
                reject(0);
            }    
        })
        
    }
}