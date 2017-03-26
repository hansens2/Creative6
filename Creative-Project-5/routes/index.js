var express = require('express');
var router = express.Router();
var mongo = require('mongodb');


var MongoClient = mongo.MongoClient;
var dbUrl = 'mongodb://localhost:27017/message';

var collection;

MongoClient.connect(dbUrl, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection success: ', dbUrl);
        collection = db.collection('message');

    }

})

/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile('index.html', { root: 'public' });
    
});

router.post('/message', function (req, res, next) {
    var pin = Math.random() * (9999);
    var hash = req.body.name * pin * 31;
    var item = {
        hash: hash,
        message: req.body.message
    }
    collection.insertOne(item, function (err, result) {
        if (err) { console.log(err) }
        else {
            res.send(pin);
        }
    });

});

router.get('/message:hashCode', function (req, res, next) {
    collection.find({ hash: req.params.hashCode }, function (err, doc) {
        if (err) {
            console.log(err)
            res.send(null);
        }
        else {
            collection.removeOne({ hash: req.params.hashCode });
            res.send(res.message);
        }
    });
})


module.exports = router;