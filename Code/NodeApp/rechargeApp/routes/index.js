var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* GET userlist page. */
router.get('/userlist', function (req, res, next) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({}, {}, function (e, docs) {
        res.render('userlist', {'userlist': docs});
    });
});

/* LOGIN function */
router.get('/login/:uname/:pwd', function (req, res) {
    if(req.session.userid){
        res.redirect('/user/'+req.session.userid)
    } else {
        var db = req.db;
        var collection = db.get('users');
        collection.findOne(
            {"email_id":req.params.uname , 
            "pwd":req.params.pwd}, 
            {fields: {_id:1}, limit : 1}, 
            function (e, doc) {
                collection.update(
                    doc, 
                    {$set:{"last_login": new Date()}}
                    );
                req.session.userid = doc._id;
                res.send(JSON.stringify(doc));
            }
        );
    }
});

router.get('/logout', function(req, res){
    req.session.destroy(function(err){
        res.redirect('/');
    });
});

/* GET user JSON. */
router.get('/user/:id', function (req, res, next) {
//    console.log('user ' + req.params.id);
    var db = req.db;
    var id = req.params.id;
    var collection = db.get('users');
    collection.findOne({"_id": id}, {}, function (e, doc) {
        res.send(JSON.stringify(doc));
    });
});

/* GET New User page. */
router.get('/newuser', function (req, res) {
    res.render('newuser', {title: 'Add New User'});
});

router.post('/register', function(req, res) {
   if(register(req, res)) {
      res.send("Registered successfully"); 
   }
});

router.post('/adduser', function (req, res) {
    //Set the internal db variable
    if(register(req, res)){ 
        res.redirect("/userlist");
    }
});

function register(req, res) {
    var db = req.db;

    //Get the form values
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var userEmail = req.body.useremail;
    var phoneNumber = req.body.phonenumber;
    var password = req.body.password;

    //pre defined values
    var userType = 1;
    var status = 1;
    var createDate = new Date();
    var lastModified = null;
    var lastLogin = null;
    
    //Set our collection
    var collection = db.get('users');
    collection.insert({
        "first_name": firstName,
        "last_name": lastName,
        "email_id": userEmail,
        "phone_no": phoneNumber,
        "user_type": userType,
        "pwd": password,
        "status": status,
        "created_date": createDate,
        "last_modified": lastModified,
        "last_login": lastLogin
    }, function (err, doc) {
        if (err) {
            res.send("A problem occured User could not be created");
        }
    });
    //If everything ok then return true
    return true;
};

module.exports = router;
