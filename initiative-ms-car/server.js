const config = require('config'),
    logger = require('./logger');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = config.listenPort|| process.env.PORT || 3001;
const route = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default
app.get('/', function (req, res) {
  res.json({message:'Application up and running'});
})

app.use('/car', route);

app.listen(PORT, () => {
  logger.info('Server is running on PORT:'+PORT);
});