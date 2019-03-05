module.exports = {

    loginIn(login , password){

        return new Promise((resolve, reject) => {

            if(login == 'admin' && password == 'admin')
                resolve('Admin');
            else if (login == 'william' && password == '123')
                resolve('William');
            else
                reject('Login Não Autorizado');
            
        });

    }

}