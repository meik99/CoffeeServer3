var express = require('express');
var coffeeFacade = require("../logic/facades/coffeeFacade");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  coffeeFacade.get(function (results) {
      res.render('index', { title: 'Express', alarms: results });
  });
});

router.get("/options", function (req, res) {
   res.render("options")
});

module.exports = router;
