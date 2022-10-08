const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secretKey} = require('../config/jwt.config');

module.exports.registrar =(req,res)=>{
   User.create(req.body)
      .then(usuario => {
            res.json({ error: false, msg: "exito!" });
      })
      .catch(err => {
        console.log(err);
          res.json({
          error: true,
          msg: "Ha ocurrido un error"})
        })
};


module.exports.login = (req, res) => {
    // En formulario, campo tendrá nombre de username, que
    // corresponderá al email del usuario.
    User.findOne({email: req.body.username})
        .then(usuario=> {
            if(usuario == null) {
                res.json({
                    error: true,
                    msg: 'Usuario o Contraseña no válido'
                })
            } else {
                bcrypt.compare(req.body.password, usuario.password)
                    .then(valido => {
                        if(valido) {
                            const payload = {
                                _id: usuario._id,
                                nombre: usuario.nombre,
                                apellido: usuario.apellido,
                                email: usuario.email
                            }
                            const newJWT = jwt.sign(payload, secretKey);
                            res.cookie("usertoken", newJWT, secretKey, {
                              httpOnly: true
                            })
                            .json({ error: false, datos: payload, msg: "success!" });
                        } else {
                            res.json({
                                error:true,
                                msg: 'Usuario o Contraseña no válido'
                            });
                        }
                    })
            }
        })
}
