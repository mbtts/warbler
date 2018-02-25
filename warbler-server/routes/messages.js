var express = require("express");
var router = express.Router({ mergeParams: true });
var db = require("../models");
var helpers = require("../helpers/messages");

router.route("/").post(helpers.createMessage);

module.exports = router;
