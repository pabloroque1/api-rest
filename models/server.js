const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../config/config');
const morgan = require('morgan');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            //auth:       '/api/auth',
            categories: '/api/categories',
            products:  '/api/products',
            clients:   '/api/clients',
        }


        this.connectDB();

        this.middlewares();

        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }


    middlewares() {

        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use(morgan("dev"));
    }

    routes() {
        
        //this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.categories, require('../routes/categories'));
        this.app.use( this.paths.products, require('../routes/products'));
        this.app.use( this.paths.clients, require('../routes/clients'));
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running in port', this.port );
        });
    }

}


module.exports = Server;
