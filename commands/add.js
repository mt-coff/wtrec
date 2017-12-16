#!/usr/bin/env node

'use strict';

const program = require('commander')
const path = require('path');
const fs = require('fs');
const dateFormat = require('dateformat')
const init = require('./init.js')

module.exports = add

function add(weight) {
  const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
  const filePath = path.join(home, 'weight.json');
  const now = new Date();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      init();
      add(weight);
      return;
    }
    const json = JSON.parse(data);
    const newData = {
      date: `${dateFormat(now, 'isoDate')} ${dateFormat(now, 'hh:mm')}`,
      weight: weight
    }

    json.push(newData);

    fs.writeFile(filePath, JSON.stringify(json), err => {
      if (err) throw err;
    });

    console.log(json);
  });
}
