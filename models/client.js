const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    state: {
      type: Boolean,
      default: true
    },
  },
);


clientSchema.methods.toJSON = function() {
    const { __v, password, ...client  } = this.toObject();
    return client;
}

module.exports = model('Client', clientSchema );
