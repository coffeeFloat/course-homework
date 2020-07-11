#!/usr/bin/env node

// console.log('node scaffolding cli');
const path = require('path');
const fs = require('fs');

const inquirer = require('inquirer');
const ejs = require('ejs');

// 发起用户询问

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project Name',
  },
]).then(anwsers => {
  // console.log(anwsers);
  // 获取模板目录：
  const tmplDir = path.join(__dirname, 'templates');
  
  // 目标目录
  const destDir = process.cwd();

  // 将模板下面的文件转换到目标目录
  fs.readdir(tmplDir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      ejs.renderFile(path.join(tmplDir, file), anwsers, (err, result) => {
        if (err) throw err;
        fs.writeFileSync(path.join(destDir, file), result);
      });
    });
  });


});
