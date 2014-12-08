#!/usr/bin/env node
var yargs  = require('yargs');
var fs     = require('fs');
var byline = require('byline');
var open   = require('open');

var argv = yargs
  .describe('n', 'number of lines to process before stdout watch ends')
  .default('n', 100)
  .describe('t', 'timeout until parse watch ends')
  .default('t', 2*1000)
  .argv;

if(argv.help) {
  yargs.showHelp();
  process.exit(1);
}

// Be invisible...
process.stdin.pipe(process.stdout);

var stream = byline(process.stdin);

var idx = 1;
function hdl(line) {
  if(line.toString().match(/<(https?:\/\/[^>]+)>/)) {
    var url = RegExp.$1;
    open(url);
    close();
  }

  if(idx >= argv.n) {
    close();
  }

  idx++;
}

function close() {
  process.stdin.unpipe(stream);
}

setTimeout(close, argv.t);
stream.on('data', hdl);
