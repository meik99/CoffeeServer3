/**
 * Created by michael on 13.10.17.
 */
var db = require("./dbFactory");
var ObjectId = require("mongodb").ObjectId;

module.exports = {
    get: function (next) {
        db(function (database) {
            database.collection("alarm").find().toArray(function (err, result) {
                if(err) throw err;

                if(next)
                    next(result);
            });
        })
    },
    getById: function(id, next) {
        db(function (database) {
            database.collection("alarm").find({_id: ObjectId(id)}).toArray(function (err, result) {
                if(err) throw err;

                if(next)
                    next(result);
            });
        })
    },
    getByFilter: function(filter, next) {
        db(function (database) {
            database.collection("alarm").find(filter).toArray(function (err, result) {
                if(err) throw err;

                if(next)
                    next(result);
            });
        })
    },
    update: function (id, data, next) {
        db(function (database) {
           database.collection("alarm").updateOne({_id: ObjectId(id)}, {$set: data}, function (err, result) {
               if(err) throw err;

               if(next)
                   next(result);
           });
        });
    },
    updateAll: function (data, next) {
        db(function (database) {
            database.collection("alarm").updateMany({}, {$set: data}, function (err, result) {
                if(err) throw err;

                if(next)
                    next(result);
            });
        });
    },
    remove: function (id, next) {
        db(function (database) {
           database.collection("alarm").deleteOne({_id: ObjectId(id)}, function (err, result) {
               if(err) throw err;

               if(next) next(result);
           });
        });
    },
    insert: function (data, next) {
        db(function (database) {
           database.collection("alarm").insertOne(data, null, function (err, result) {
               if(err) throw err;
               if(next) next(result);
           });
        });
    }
};