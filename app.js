const express = require('express');
const app = express();
const morgan = require('morgan');
//what is path? ❓
const path = require('path');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
//serving up static files (e.g. css files)
app.use(express.urlencoded({ extended: false }));
//----------------missing this part in our original practice
app.use(express.json()); // ❓ what is json?
// app.use(require('method-override')('_method')); // ❓  what is this part?
//----------------

app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/users'));

app.get('/', function (req, res) {
  res.redirect('/wiki/');
});

module.exports = app; //why here?

// this part is not in the solution
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
