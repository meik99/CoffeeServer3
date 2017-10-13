/**
 * Created by michael on 13.10.17.
 */
/**
 * Created by michael on 13.10.17.
 */
var express = require("express");
var coffeeFacade = require("../../logic/facades/coffeeFacade");
var router = express.Router();


router.get("/", function (req, res) {
    coffeeFacade.get(function (result) {
        res.send(result);
    });
});

router.put("/:id", function (req, res) {
    coffeeFacade.update(req.params.id, {hour: parseInt(req.body.hour), minute: parseInt(req.body.minute)}, function () {
        coffeeFacade.getById(req.params.id, function (result) {
            res.send({result: result});
        })
    });
});

module.exports = router;