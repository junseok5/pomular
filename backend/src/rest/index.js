const express = require('express');
const router = express.Router();
const serveStatic = require('serve-static')

const serve = serveStatic('public/ftp', {'index': ['index.html', 'index.htm']})

/* GET home page. */
router.get('/', function(req, res, next) {
  serve(req, res, finalhandler(req, res))
});

module.exports = router;
