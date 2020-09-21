const express = require('express');
const router = express.Router();
const Student = require('./model');

router.get('/', (req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((err) => {
      res.send({
        status: 400,
        message: 'Did not get a list of students' + err,
      });
    });
});

router.post('/add', (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  });

  newStudent
    .save()
    .then(() => res.json('Student added to db'))
    .catch((err) => {
      res.send({
        status: 400,
        message: 'Error was : ' + err,
      });
    });
});

router.delete('/delete/:id', (req, res, next) => {
  Student.findOneAndRemove(req.params.id)
    .then(() => res.json('Student was deleted'))
    .catch((err) => ({
      status: 400,
      message: 'The request was bad' + err,
    }));
});

router.put('/update/:id', (req, res) => {
  Student.findById(req.params.id)
    .then((student) => {
      student.name = req.body.name;
      student.age = req.body.age;
      student.email = req.body.email;
      student
        .save()
        .then(() => res.json('Student was updated'))
        .catch((err) => {
          res.send({ status: 400, message: 'Updated was failed ' + err });
        });
    })
    .catch((err) => res.status(400).json('The request was fail' + err));
});
module.exports = router;
