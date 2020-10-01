const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
//const { addPage, editPage, main, userList, userPages, wikiPage } = require('./views/index');

app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.get('/layout', (req, res, next) => {
  res.send(layout(''));
});

app.get('/', (req, res, next) => {
  res.send('hello world');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
