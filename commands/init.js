#!/usr/bin/env node

'use strict';

const util = require('util');
const path = require('path');
const fs = require('fs');

const stat = util.promisify(fs.stat);
const writeFile = util.promisify(fs.writeFile);

module.exports = init;

function init() {
  return new Promise((resolve, reject) => {
    const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
    const filePath = path.join(home, 'weight.json');

    stat(filePath)
      .then(status => {
        resolve('weight.json already exists.');
      })
      .catch(err => {
        writeFile(filePath, JSON.stringify([], null, 2))
          .then(() => {
            resolve('Generated weight.json.');
          })
          .catch(err => {
            reject(err);
          });
      });
  });
}
