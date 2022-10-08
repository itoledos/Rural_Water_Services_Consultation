const mongoose = require('mongoose');

const ConsumerSchema = new mongoose.Schema({
    userID: {type: String,
        required: [true, 'User ID is required'],
        minLength: [1, 'ID de usuario debe contener al menos 1 caracter']
        },
    rolProp: {type: String,
        required: [true, 'User ID is required'],
        minLength: [1, 'ID de usuario debe contener al menos 1 caracter']
        },
    name: {type: String,
        required: [true, 'User name is required'],
        minLength: [1, 'Nombre de usuario debe contener al menos 1 caracter']
        },
    address: {type: String,
        required: [true, 'Description is required'],
        minLength: [1, 'Identificador de medidor de agua debe contener al menos 1 caracter']
        },
    mail: {type: String,
        required: [true, 'Description is required']
        },
    phone: {type: Number,
        required: [true, 'Description is required']
        },
    meterID: {type: String,
        required: [true, 'Flow Meter ID is required']
        },
    member: {type: Boolean,
        required: true
        },
    active: {type: Boolean,
        required: true
        }
}, {timestamps: true});

module.exports.Consumer = mongoose.model("Consumer", ConsumerSchema);


