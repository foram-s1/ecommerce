const conn = require('./dbconn');
const Router = require('express').Router();

require('./product')(Router, conn);
require('./cart')(Router, conn);



module.exports = Router;
