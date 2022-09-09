#!/home/grif/.nvm/versions/node/v18.2.0/bin/node

var repl = require("repl");
var context = repl.start("$ ").context;

// Configure what’s available in the REPL
const c = require('./inits')

Object.assign(context, c);

