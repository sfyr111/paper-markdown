#!/usr/bin/env node

var fs = require("fs"),
    path = process.cwd(),
    appInfo = require('./../package.json'),
    download = require("download"),
    md = require('to-markdown'),
    extract = require('html-extract');

var run = function(obj){
  if(obj[0]){
    if(obj[0] === '-v'){
       console.log(appInfo.version);
       process.exit();
    } else if(obj[0] === '-h'){
      console.log(__dirname);
      console.log('Useage:');
      console.log('  $ convert -v --version [show version]');
      console.log('  $ convert url [convert markdown]');
      console.log('  url [is http://www.jianshu.com blog]');
      process.exit();
    } else if(obj[0].slice(0,22) === 'http://www.jianshu.com') {
      download(process.argv.slice(2)[0]).pipe(fs.createWriteStream(__dirname.slice(0,-4) + '/post/down.html'));
    }
  } else {
    console.log('Useage:');
    console.log('  $ convert -v --version [show version]');
    console.log('  $ convert url [convert markdown]');
    console.log('  url [is http://www.jianshu.com blog]');
    process.exit();
  }
}

fs.watchFile(__dirname.slice(0,-4) + '/post/down.html', {interval: 100}, function (curr, prev) {
    fs.readFile(__dirname.slice(0,-4) + '/post/down.html', {flag: 'r+', encoding: 'utf8'}, function(err, data){
      if(err){
        console.log(err);
        return;
      }
      extract(data, {
        content: function ($) {
          var dom = $('.show-content').html();
          // console.log(md(dom));
          if(typeof(dom) === 'string'){
            fs.unlink(__dirname.slice(0,-4) + '/post/test.md');
            fs.open(__dirname.slice(0,-4) + '/post/test.md', 'w', function(err){
              console.log(__dirname.slice(0,-4) + '/post/test.md');
              if(err){
                console.log(err);
              }
              fs.writeFile(__dirname.slice(0,-4) + '/post/test.md', md(dom), {flag: 'a'}, function (err) {
                 if(err) {
                  console.error(err);
                  } else {
                     console.log('写入成功');
                     console.log('-----------------复制以下命令打开文件---------------')
                     console.log('\nopen ' + __dirname.slice(0,-4) + '/post/test.md\n');
                     console.log('-------------------------------------------------')
                     process.exit();
                  }
              });
            });
          } else {
            return
          }
        }
      });
    });
});
run(process.argv.slice(2));
