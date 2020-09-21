const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRouter = require('./router');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  next();
});
app.use('/student', studentRouter);

const db = 'mongodb://localhost/school';
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDb was started'))
  .catch((err) => console.log('something is wrong in mongodb', err));

app.listen(5000, () => console.log('I am running on 5000'));
