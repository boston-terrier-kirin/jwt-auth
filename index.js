const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');
const router = require('./router');
const app = express();

mongoose.connect(config.mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

router(app);

const port = process.env.PORT || 3090;
app.listen(port);

console.log('Server listening on:' + port);
