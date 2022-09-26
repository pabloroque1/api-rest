const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const  Client  = require('../models/client');



const clientsGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };

    try {
        const [ total, clients ] = await Promise.all([
            Client.countDocuments(query),
            Client.find(query)
                .skip( Number( desde ) )
                .limit(Number( limite ))
        ]);
    
        res.status(200).json({total,clients});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error processing request" });
    }
}

const clientsPost = async(req, res = response) => {
    
    const { name, email, password } = req.body;
    

    try {
        const client = new Client({ name, email, password });
        const salt = bcryptjs.genSaltSync();
        client.password = bcryptjs.hashSync( password, salt );

        await client.save();

        return res.status(200).json({client});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error processing request" });
    }
    
}

const clientsPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, email, ...resto } = req.body;

    try {
        if ( password ) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync( password, salt );
        }
    
        const client = await Client.findByIdAndUpdate( id, resto );
        return res.status(200).json({client});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error processing request" });
    }

}

const clientsDelete = async(req, res = response) => {

    const { id } = req.params;

    try {
        const client = await Client.findByIdAndUpdate( id, { state: false } );
        return res.status(200).json({client})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error processing request" });
    }

}




module.exports = {
    clientsGet,
    clientsPost,
    clientsPut,
    clientsDelete,
}