#!/usr/bin/env node

const { Command } = require('commander');
const lib = require('../lib/main');

const program = new Command();

function myParseInt(value, dummyPrevious) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidArgumentError('Not a number.');
  }
  return parsedValue;
}

program
  .command('process')
  .argument('<first>', 'author name')
  .action((author) => {
	lib.runProcess(author)
  });

program.parse();