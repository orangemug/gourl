#!/usr/bin/env node
var fs     = require('fs');
var byline = require('byline');
var open   = require('open');

// Be invisible...
process.stdin.pipe(process.stdout);

var stream = byline(process.stdin);

var idx = 0;
function hdl(line) {
  if(line.toString().match(/<(https?:\/\/[^>]+)>/)) {
    var url = RegExp.$1;
    open(url);
    close();
  }

  if(idx >= 100) {
    close();
  }

  idx++;
}

function close() {
  process.stdin.unpipe(stream);
}

setTimeout(close, 2*1000);
stream.on('data', hdl);
