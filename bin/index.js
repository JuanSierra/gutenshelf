#!/usr/bin/env node

const commander  = require('commander');
const lib = require('../lib/main');

const program = new commander.Command();


function parsePort(value) {
  console.log(value)
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidArgumentError('Not a number.');
  }
  
  return parsedValue;
}

program
  .command('search')
  .argument('<term>', 'Words to search in titles or authors of books.')
  .description('Use a search term in author and titles existing in the Gutenberg library.')
  .option('-ns, --noserve', 'Generate HTML without serve it locally.')
  .option('-p, --port <number>', 'Local port to serve the generated site.', parsePort)
  .action((term, options) => {
	  lib.search(term, null, options)
  });

  program
  .command('topic')
  .argument('<term>', 'Words to search by book topic.')
  .description('Use a search term for a topic existing in the Gutenberg library.')
  .option('-ns, --noserve', 'Generate HTML without serve it locally.')
  .option('-p, --port <number>', 'Local port to serve the generated site.', parsePort)
  .action((topic, options) => {
	  lib.search(null, topic, options)
  });

program.parse();