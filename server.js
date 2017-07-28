const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append server.log')
    }
  })
  next();
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle:'maintenance page'
//   })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('upperCase', (text) => {
  return text.toUpperCase()
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello express</h1>');
  res.render('home.hbs', {
    pageTitle:'home page',
    welcomeMessage:'welcome to my web page'
  })
});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle:'about this page'
  });
});
app.get('/bad', (req, res) => {
  res.send({
    errorMessage:'Unable to handle request'
  })
});
app.listen(port, () =>{
  console.log(`server is running on port ${port}`);
});
