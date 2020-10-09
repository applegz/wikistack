const express = require('express');
const router = express.Router();
const { Page, User } = require('../models'); //get data
const { main, addPage, editPage, wikiPage } = require('../views'); //get page format

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages)); //main is the website format, pages is the data
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // what is this 👇 ❓
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    const page = await Page.create(req.body);
    // create method is a shortcut of build() & save(), it's used to start a new row in db https://sequelize.org/master/manual/model-instances.html
    await page.setAuthor(user); //setAuthor is a magic method, it takes latter's obj or id, then add authorId into that row? ❓ could also return former's obj
    res.redirect('/wiki/' + page.slug);
  } catch (error) {
    next(error);
  }
});

router.put('/:slug', async (req, res, next) => {
  try {
    //update method: 1st parameter: what needs to be updated; 2nd parameter: where to find the row that needs to be updated
    // what is this 👇 ❓
    const [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug,
      },
      returning: true,
    });
    res.redirect('/wiki' + updatedPages[0].slug);
  } catch (error) {
    next(error);
  }
});

router.delete('/:slug', async (req, res, next) => {
  try {
    await Page.destroy({
      where: {
        slug: req.params.slug,
      },
    });
    res.redirect('/wiki');
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    if (page === null) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor(); //magic method
      res.send(wikiPage(page, author));
      //in the wikiPage.js, func takes 2 parameters
    }
  } catch (error) {
    next(error);
  }
});

router.post('/:slug', async (req, res, next) => {
  try {
    const [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug,
      },
      returning: true,
    });
    res.redirect(`/wiki/${updatedPages[0].slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/:slug/edit', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    if (page === null) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(editPage(page, author));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
