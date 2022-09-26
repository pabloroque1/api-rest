const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
});


CategorySchema.methods.toJSON = function() {
    const { __v, state, ...data  } = this.toObject();
    return data;
}


module.exports = model('Category', CategorySchema );