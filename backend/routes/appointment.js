var express = require('express');
var router = express.Router();
const {Appointment} =require("../db/Models/appointment.models")
const ObjectID = require('mongodb').ObjectID;

router.get('/',(req, res, next) => {
Appointment.find({})
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.post('/', (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '');
  // res.header('Access-Control-Allow-Headers',
  // "Origin , X-Requested-With,Content-Type,Accept");
  const { appointmentDate, numberOfPeople , place } = req.body;
  if (!appointmentDate || !numberOfPeople || !place) {
    return res.status(400).json({
      message: 'Appointment Date, Number Of People and place are required',
    });
  }
  const payload = { appointmentDate, numberOfPeople, place };
  Appointment.create(payload)
    .then(result => res.json(result.ops[0]))
    .catch(error => res.send(error));
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);
  Appointment.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

module.exports = router;
