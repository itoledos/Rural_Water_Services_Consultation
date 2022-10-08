const {Reading} = require("../models/reading.model")



module.exports.createReading = (req,res) => {
  const { userID, rolProp, meterID, anio, mes, medicion} = req.body;

  // mongoose viene con la función create
  Reading.create({
    userID: userID,
    rolProp: rolProp,
    meterID: meterID,
    anio: anio,
    mes: mes,
    medicion: medicion
  })
  .then(pet=>res.json(pet))
  .catch(err=>res.json(err))
}

module.exports.getAllReadings = (req,res) => {
  Reading.find()
    .then(all=>res.json({all}))
    .catch(err=>res.json(err))
}

module.exports.getReading = (req,res) => {
  Reading.findOne({_id:req.params.id})
  .then(qry=>res.json({'justOne': qry}))
  .catch(err=>res.json(err))
}

module.exports.updateReading = (req,res) => {
  Reading.findOneAndUpdate({_id:req.params.id},
    req.body, {new: true, runValidators: true})
  .then(upd=>res.json(upd))
  .catch(err=>res.json(err))
}

module.exports.deleteReading = (req,res) => {
  Reading.deleteOne({_id:req.params.id})
  .then(delConfirm=>res.json(delConfirm))
  .catch(err=>res.json(err))
}