const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./roles");
db.lesson= require("./lesson");
db.category = require("./category");
db.subject = require("./subject");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;