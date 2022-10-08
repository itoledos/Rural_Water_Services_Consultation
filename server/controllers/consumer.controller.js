const {Consumer} = require("../models/consumer.model")



module.exports.createConsumer = (req,res) => {
  const { userID, rolProp, name, address, mail, phone, meterID, member, active} = req.body;

  // ACTUALIZAR ESTOS CAMPOS !!!!!!!!!!!
  // mongoose viene con la función create
  Consumer.create({
    userID: userID,
    rolProp: rolProp,
    name: name,
    address: address,
    mail: mail,
    phone: phone,
    meterID: meterID,
    member: member,
    active: active
  })
  .then(pet=>res.json(pet))
  .catch(err=>res.json(err))

  // dentro de res.json, si creamos un objeto directamente, debe
  // llevar el formato de {name: name, age:age, etc}

}

module.exports.getAllConsumers = (req,res) => {
  Consumer.find()
    .then(all=>res.json({all}))
    .catch(err=>res.json(err))

  // dentro de res.json, si creamos un objeto directamente, debe
  // llevar el formato de {name: name, age:age, etc}

}

module.exports.getConsumer = (req,res) => {
  Consumer.findOne({_id:req.params.id})
  .then(qry=>res.json({'justOne': qry}))
  .catch(err=>res.json(err))
}

module.exports.updateConsumer = (req,res) => {
  Consumer.findOneAndUpdate({_id:req.params.id},
    req.body, {new: true, runValidators: true})
  .then(upd=>res.json(upd))
  .catch(err=>res.json(err))
}

module.exports.deleteConsumer = (req,res) => {
  Consumer.deleteOne({_id:req.params.id})
  .then(delConfirm=>res.json(delConfirm))
  .catch(err=>res.json(err))
}

// module.exports.deleteConsumer = (req,res) => {
//   Consumer.deleteOne({_id:req.params.id})
//   .then(delConfirm=>res.json(delConfirm))
//   .catch(err=>res.json(err))
// }