const mongoose = require('mongoose');

  // near the top is a good place to group our imports
const bcrypt = require('bcrypt');
  // this should go after 



const UserSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: [true, "Debe ingresar primer nombre"]
    },
    apellido: {
      type: String,
      required: [true, "Debe ingresar apellido"]
    },
    email: {
      type: String,
      required: [true, "Email es requerido"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Por favor ingrese in email válido"
      }
    },
    password: {
      type: String,
      required: [true, "La clave es requerida"],
      minlength: [3, "La contraseña debe tener al menos 3 caracteres"]
    }
  }, {timestamps: true});

  UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );
  
  UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
  });

  UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });

  const User = mongoose.model("User", UserSchema);

  module.exports = User;
  
  

