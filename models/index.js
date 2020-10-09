const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: Sequelize.TEXT, // 👈 TEXT can hold up to 30,000 chars, STRING's limit is 255
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

Page.beforeValidate((page) => {
  if (!page.slug) {
    page.slug = page.title.replace(/\s/g, '_').replace(/\W/g, '').toLowerCase();
    // replace method takes 2 parameters: 1st: phrase that wants to be replaced; 2nd: phrase to replace former
    //meaning here: replace all empty space with _ sign, delete all capital char, then replace with lowercase one
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      // does it matter to use this format?
      isEmail: true,
    },
  },
});

//This adds methods to 'Page', such as '.setAuthor'. It also creates a foreign key attribute on the Page table pointing ot the User table
Page.belongsTo(User, { as: 'author' }); //necessary, the line below in the doc is optional

module.exports = {
  db,
  Page,
  User,
};
