#!use/bin/env node

'use strict';

const fs = require('fs');
const path = require('path')

module.exports = reset

function reset() {
  const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
  const filePath = path.join(home, 'weight.json');

  fs.unlink(filePath, err => {
    if (err) throw err;
  });

  fs.stat(filePath, (err, stats) => {
    if (err) {
      const data = [];
      fs.writeFile(filePath, JSON.stringify(data), err => {
        if (err) {
          throw err;
        }

        console.log('reset weight.json');
      });
    }
  });

}
