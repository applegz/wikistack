const express = require('express');
const router = express.Router();
const app = express();
const morgan = require('morgan');

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

