const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/locations', (req, res) => {
  res.send('Location added successfully');
});

app.get('/nearby', (req, res) => {
  const { longitude, latitude } = req.query;
  res.send('Nearby locations found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
