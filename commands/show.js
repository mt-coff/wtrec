#!/usr/bin/env node

'use strict';

const util = require('util');
const path = require('path');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = show;

function show() {
  return new Promise((resolve, reject) => {
    const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
    const filePath = path.join(home, 'weight.json');

    readFile(filePath)
      .then(data => {
        let formatedData = '';
        JSON.parse(data).forEach((e) => {
          formatedData += `${e.date}: ${e.weight}\n`
        });
        resolve(formatedData);
      })
      .catch(err => {
        reject(err);
      });
  });
}
