var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
//  res.send('respond with a resource');
    var db = req.db;
    var collections = db.get('rechargeapp');
    collections.find({}, {}, function (e, docs) {
//        console.log(JSON.stringify(docs));
        res.render('userlist', {
            "userlist": docs
        })
    });
});

module.exports = router;
