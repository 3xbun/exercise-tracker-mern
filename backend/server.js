const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB connected successfully");
});

// Routes
const exerciseRouter = require('./routes/excercise');
const userRouter = require('./routes/user');

app.use('/exercise', exerciseRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});




