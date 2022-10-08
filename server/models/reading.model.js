const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema({
    userID: {type: String,
        required: [true, 'User ID is required'],
        minLength: [1, 'ID de usuario debe contener al menos 1 caracter']
        },
    rolProp: {type: String,
        required: [true, 'User ID is required'],
        minLength: [1, 'ID de usuario debe contener al menos 1 caracter']
        },
    meterID: {type: String,
        required: [true, 'User ID is required'],
        minLength: [1, 'ID de usuario debe contener al menos 1 caracter']
        },
    anio: {type: Number,
        required: [true, 'Se requiere ingresar año.'],
        minLength: [1, 'Se requiere ingresar año.']
        },
    mes: {type: String,
        required: [true, 'Se requiere ingresar mes'],
        minLength: [1, 'Se requiere ingresar mes']
        },
    medicion: {type: Number,
        required: [true, 'Se requiere ingresar medición']
        },
}, {timestamps: true});

module.exports.Reading = mongoose.model("Reading", ReadingSchema);


