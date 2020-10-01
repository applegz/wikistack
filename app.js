const express = require('express');
const morgan = require('morgan');
const { User } = require('./models');
const app = express();
const layout = require('./views/layout');

const wikiRouter = require('./routes/wiki');
const userrouter = require('./routes/users');

app.use('/wiki', wikiRouter);

app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

// app.get('/layout', (req, res, next) => {
//   res.send(layout(''));
// });

// app.get('/', (req, res, next) => {
//   res.send('hello world');
// });

const init = async () => {
  await db.sync({ force: true });
  // await Page.sync();
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
