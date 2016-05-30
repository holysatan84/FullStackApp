var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET userlist page. */
router.get('/userlist', function(req, res, next) {
	var db = req.db;
	var collection = db.get('users');
	collection.find({},{"first_name":1,"pwd":0}, function(e, docs) {
		res.render('userlist', { 'userlist' : docs });
	});
});

module.exports = router;
