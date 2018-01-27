#!/usr/bin/env node

'use strict';

const util = require('util');
const path = require('path');
const fs = require('fs');
const dateFormat = require('dateformat')
const init = require('./init.js')

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = add;

function add(weight) {
  return new Promise((resolve, reject) => {
    const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
    const filePath = path.join(home, 'weight.json');
    const now = new Date();

    readFile(filePath)
      .then(data => {
        const json = JSON.parse(data);
        const newData = {
          date: `${dateFormat(now, 'isoDate')} ${dateFormat(now, 'HH:MM')}`,
          weight: weight
        }

        json.push(newData);
        writeFile(filePath, JSON.stringify(json, null, 2))
          .then(() => {
            resolve(`Added weight: ${ newData.weight }.`);
          })
          .catch(err => {
            reject(err);
          })
      })
      .catch(err => {
        init()
          .then(msg => {
            console.log(msg);
            resolve(add(weight));
          })
          .catch(err => {
            reject(err);
          });
      });
  });
}
