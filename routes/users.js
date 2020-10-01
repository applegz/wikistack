const express = require('express');
const router = express.Router();
const app = express();
const morgan = require('morgan');
// const wikiRouter = require('./wiki');
// const userRouter = require('./users');

// app.use('/users', userRouter);

router.get('/', (req, res, next) => {
  try {
    res.send('hello world');
  }
  catch (error) {
    console.log("there was an error");
  }
});

router.post('/', async (req, res) => {

});

module.exports = router;