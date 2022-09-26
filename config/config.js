const mongoose = require('mongoose');

const dbConnection = async() => {
    // const connectionData = {
    //     mongodb_user: process.env.MONGODB_USERS,
    //     mongodb_pass: process.env.MONGODB_PASSWORDS,
    //     mongodb_ip: 27017,
    //     mongodb_database: db_pabloo,
    //     mongodb_ssl: false,
    //   };

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
        console.log('Database online ');

    } catch (error) {
        console.log(error);
        throw new Error('Error in database connection');
    }


}



module.exports = {
    dbConnection
}
