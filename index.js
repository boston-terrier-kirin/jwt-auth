const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const router = require('./router');
const app = express();

mongoose.connect(
	'mongodb+srv://emaily:HdioBJr8eFHM75WU@cluster0.h3ozz.mongodb.net/auth?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	}
);

app.use(morgan('combined'));
app.use(express.json());

router(app);

const port = process.env.PORT || 3090;
app.listen(port);

console.log('Server listening on:' + port);
