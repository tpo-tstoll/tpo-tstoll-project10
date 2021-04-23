'use strict';
const db = require('./models');
const routes = require('./routes');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// creates the Express app
const app = express();
// Enable All CORS Requests
app.use(cors());
// creates port variable
const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());

// Setup morgan which gives us http request logging
app.use(morgan('dev'));

app.use(routes);

// Tests connection and syncs syncs the model with the database.
(async () => {
  await db.sequelize.sync();
  try {
    await db.sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

app.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT}`);
});