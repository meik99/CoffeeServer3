/**
 * Created by michael on 13.10.17.
 */
/**
 * Created by michael on 13.10.17.
 */
var express = require("express");
var coffeeFacade = require("../../logic/facades/coffeeFacade");
var coffeeMaker = require("../../logic/coffeeMaker");
var router = express.Router();


router.get("/", function (req, res) {
    coffeeFacade.get(function (result) {
        res.send(result);
    });
});

router.get("/asList", function(req, res) {
    coffeeFacade.get(function (result) {
       res.render("alarm_list", {alarms: result});
    });
});

router.get("/now", function (req, res) {
    coffeeMaker.makeCoffee();
    res.send({result: "Making coffee"});
});

router.put("/:id", function (req, res) {
    coffeeFacade.update(req.params.id, {hour: parseInt(req.body.hour), minute: parseInt(req.body.minute)}, function () {
        coffeeFacade.getById(req.params.id, function (result) {
            res.send({result: result});
        });
    });
});

router.delete("/:id", function (req, res) {
    coffeeFacade.remove(req.params.id, function (result) {
       res.send({result: result});
    });
});

router.post("/", function (req, res) {
    if(req.body.hour && req.body.minute){
        var data= {
            hour: req.body.hour,
            minute: req.body.minute
        };

        if(req.body.name){
            data.name = req.body.name;
        }


        coffeeFacade.insert(data, function (result) {
            res.send({result: result});
        });
    }else{
        res.send({result: "error"});
    }
});

router.put("/pause/:id", function (req, res) {
   if(req.params.id){
       coffeeFacade.update(req.params.id, {stopped: false}, function (result) {
          res.send({result: result});
       });
   } else{
       res.send({result: "error"});
   }
});


router.put("/start/:id", function (req, res) {
    if(req.params.id){
        coffeeFacade.update(req.params.id, {stopped: true}, function (result) {
            res.send({result: result});
        });
    } else{
        res.send({result: "error"});
    }
});

module.exports = router;