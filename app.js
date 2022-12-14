const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require("dotenv").config()
const connectionStr = process.env.MONGODB_URI
mongoose.set('strictQuery', false);

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const place = require('./models/place');

app.use(express.json())

app.use(bodyParser.json());

app.use('/api/places', placesRoutes); // => /api/places...
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});


mongoose
  .connect(connectionStr)
  .then(() => {
    app.listen(7000);
  })
  .catch(err => {
    console.log(err);
  });



  mongoose.connection.on('connected', () => {
    console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected ... 🙌 🙌 🙌`); 
  });
mongoose.connection.on('error', (error) => {
    console.log('MongoDB connection error 😥', error);
  });
mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected  ⚡️ 🔌 ⚡️'));







// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose')
// require('dotenv').config()
// const connectionStr = process.env.MONGODB_URI

// const placesRoutes = require('./routes/places-routes');
// const usersRoutes = require('./routes/users-routes');
// const HttpError = require('./models/http-error');


// const app = express();

// app.use(bodyParser.json());

// app.use('/api/places', placesRoutes); 
// app.use('/api/users', usersRoutes);

// app.use((req, res, next) => {
//   const error = new HttpError('Could not find this route.', 404);
//   throw error;
// });

// app.use((error, req, res, next) => {
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500)
//   res.json({message: error.message || 'An unknown error occurred!'});
// });

// mongoose.connect(connectionStr)
// .then(()=>{
//   app.listen(7000);
// })
// .catch(err =>{
//   console.log(err)
// })

