const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  console.log(log);
  next();
});

// mait. page >>> comment out if not needed
// app.use((req, res) => res.render('maintenance.hbs'));

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

// route handlers
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'This Is My Home Page',
    welcomeMessage: 'Hi my name is Jared, welcome to my page.',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'This Is My About Page',
  });
});

app.get('/poojects', (req, res) => {
  res.render('poojects.hbs', {
    pageTitle: '💩💩💩',
    welcomeMessage: '💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩',
  });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
