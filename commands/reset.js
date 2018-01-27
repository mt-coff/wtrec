#!use/bin/env node

'use strict';

const util = require('util');
const fs = require('fs');
const path = require('path')

const stat = util.promisify(fs.stat);
const unlink = util.promisify(fs.unlink);

module.exports = reset;

function reset() {
  return new Promise((resolve, reject) => {
    const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
    const filePath = path.join(home, 'weight.json');

    unlink(filePath)
      .then(() => {
        writeFile(filePath, JSON.stringify([], null, 2))
          .then(() => {
            resolve('weight.json reseted');
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}
