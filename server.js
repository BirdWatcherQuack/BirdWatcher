const path = require('path');
const express = require('express');

//manage 2 layouts of handlebars
//const Hapi = require('@hapi/hapi');
//const HandlebarsRepeatHelper = require('handlebars-helper-repeat')
// extend handlebars instance
//Handlebars.registerHelper('repeat', HandlebarsRepeatHelper)


// Import express-session
const session = require('express-session');
const exphbs = require('express-handlebars');


const routes = require('./controllers');
const sequelize = require('./config/connection');
//const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;





// Set up Handlebars.js engine with custom helpers
// const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  // store: new SequelizeStore({
  //   db: sequelize
  // })
};

app.use(session(sess));


//const hbs = exphbs.create({ helpers });
//app.engine('handlebars', hbs.engine);

const hbs = exphbs.create({});
//templates
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// Configure template Engine and Main Template File
// app.engine('hbs', exphbs({
//   defaultLayout: 'login',
//   extname: '.handlebars'
// }));


app.use(express.json());

//to collect data that sent from the user
app.use(express.urlencoded({ extended: true }));

//css, imgs, js
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
