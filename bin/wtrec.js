#!/usr/bin/env node

const program = require('commander');
const init = require('../commands/init.js');
const add = require('../commands/add.js');
const reset = require('../commands/reset.js');

program
  .version(require('../package').version, '-v --version')
  .usage('<command>');

program
  .command('init')
  .description('create JSON')
  .action(init);

program
  .command('reset')
  .description('reset JSON')
  .action(reset);

program
  .command('add <weight>')
  .description('add your weight in JSON')
  .action(weight => {
    add(weight);
  });

program.parse(process.argv);
