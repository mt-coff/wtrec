#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');

module.exports = init;

function init() {
  const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
  const filePath = path.join(home, 'weight.json');

  fs.stat(filePath, (err, stats) => {
    if (err) {
      const data = [];
      fs.writeFile(filePath, JSON.stringify(data), err => {
        if (err) {
          throw err;
        }

        console.log('generate weight.json');
      });
    }
  });
}
