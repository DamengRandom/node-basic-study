const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getGeoData = require('./utils/getGeoData');
const getWeather = require('./utils/getWeather');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express(); // initial express function
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
// hbs files path config:
const viewPath = path.join(__dirname, '../templates/views');
// partials
const partialPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirectoryPath)); // render {{path}}.html contents
// express static serves the file path / routes directory

app.set('view engine', 'hbs'); // set allows to set values for the app
app.set('views', viewPath);
hbs.registerPartials(partialPath); // set partials for hbs templates !!!


app.get('', (req, res) => {
  res.render('index', {
    title: 'HBS render title',
    name: 'dameng'
  }); // render() is used to render the views (html files)
});

// app.get('', (req, res) => {
//   res.send('<h3>Hello Express!</h3>'); // return html
// }); // get the url resource

app.get('/help', (req, res) => {
  res.send({ // return json data
    name: 'damon',
    age: 30
  });
});

// app.get('/about', (req, res) => {
//   res.send('Hi about page ..');
// });

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'HBS render about page',
    name: 'about dameng'
  }); // render() is used to render the views (html files)
});


app.get('/weather', (req, res) => {
  // res.send('Hi weather page ..');
  if(!req.query.location) {
    return res.send({
      error: 'You must provide the location'
    });
  }

  if(req.query.location) {
    getGeoData(req.query.location, (error, data = {}) => {
      if(error) {
        console.log('Error Message: ', error);
        return res.send({
          error
        });
      }
      const { lat, lng } = data;
      getWeather(lat, lng, (error, data) => {
        if(error) {
          console.log('Wather Fetch Error: ', error);
          return res.send({
            error
          });
        }
        // console.log('Weather Data: ', data);
        return res.send({
          forecast: data,
          location: req.query.location,
        });
      });
    });
  }
});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({ // must write return, becasue we want to response ONE/SINGLE time
      error: 'You must provide a search parameter'
    });
  }
  // console.log(req.query);
  return res.send({
    products: []
  });
});

app.get('/about/*', (req, res) => { // * means no match path / route
  res.send('<h1>Ooops, about child page not found (404 Error)</h1>');
});

// app.get('*', (req, res) => { // * means no match path / route
//   res.send('<h1>Ooops, page not found (404 Error)</h1>');
// });

app.get('*', (req, res) => { // * means no match path / route
  res.render('404', {
    title: 'not found - 404'
  });
});

// start server:
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is up ..`);
});
