#!/usr/bin/env node
var yargs  = require('yargs');
var fs     = require('fs');
var byline = require('byline');
var open   = require('open');

var argv = yargs
  .describe('number', 'number of lines to process before stdout watch ends')
  .default('number', 100)
  .describe('timeout', 'timeout until parse watch ends')
  .default('timeout', 2*1000)
  .describe('multiple', 'open multiple urls')
  .default('multiple', 1)
  .describe('interval', 'used with multiple as the interval in ms between open calls')
  .default('interval', 1000)
  .number("interval")
  .alias("n", "number")
  .alias("t", "timeout")
  .alias("m", "multiple")
  .alias("i", "interval")
  .argv;

if(argv.help) {
  yargs.showHelp();
  process.exit(1);
}

if(Number.isNaN(argv.interval)) {
  argv.interval = argv.i = 1000;
}

// Be invisible...
process.stdin.pipe(process.stdout);

var stream = byline(process.stdin);

var idx = 1;
var opensLeft = parseInt(argv.multiple, 10);
var currInterval = 0;

function hdl(line) {
  var urlRegExp = "<(https?:\/\/[^>]+)>";
  var matches = line.toString().match(new RegExp(urlRegExp, "g"));

  if(opensLeft < 1) {
    close();
    return;
  }

  if(matches) {
    for(var i=0; i<matches.length; i++) {
      matches[i].match(urlRegExp);
      var url = RegExp.$1;

      setTimeout(open.bind(this, url), currInterval);

      opensLeft--;
      currInterval += argv.interval;

      if(opensLeft < 1) {
        close();
        break;
      }
    }
  }

  if(idx >= argv.number) {
    close();
  }

  idx++;
}

function close() {
  process.stdin.unpipe(stream);
}

setTimeout(close, argv.timeout);
stream.on('data', hdl);
