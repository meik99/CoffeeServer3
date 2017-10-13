/**
 * Created by michael on 13.10.17.
 */
var mongodb = require("mongodb");

module.exports = function (method) {
    mongodb.MongoClient.connect("mongodb://localhost:27017/coffeedb", function(err, database) {
        if(err) throw err;

        method(database);
    });
};

