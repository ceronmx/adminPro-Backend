const jwt = require('jsonwebtoken');

const generaJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {
        const payload = {
            uid,
        }
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if(err) {
                console.log('Error inesperado');
                reject(err);
            } else {
                resolve(token);
            }
        })
    });

}

module.exports = {
    generaJWT
}