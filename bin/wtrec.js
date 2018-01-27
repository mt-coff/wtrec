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
  .action(() => {
    init()
      .then(msg => {
        console.log(msg);
      })
      .catch(err => {
        console.error(err);
      });
  });

program
  .command('reset')
  .description('reset JSON')
  .action(() => {
    reset()
      .then(msg => {
        console.log(msg);
      })
      .catch(err => {
        console.error(err);
      });
  });

program
  .command('add <weight>')
  .description('add your weight in JSON')
  .action(weight => {
    add(weight)
    .then(msg => {
      console.log(msg)
    })
    .catch(err => {
      console.log(err)
    });
  });

program.parse(process.argv);
