const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true ,useUnifiedTopology: true})
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB is connected");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('mern-task/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'mern-task', 'build', 'index.html'));
    })
}

app.listen(port,function() {
    console.log(`server is listining on port: ${port}`);
});