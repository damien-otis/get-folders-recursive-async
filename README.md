# get-folders-recursive-async


Usage:

var getFoldersRecursiveAsync = require('get-folders-recursive-async');

var folder = "~/";

var filetypes = [".js$",".css$"];

getFilesRecursiveAsync(folder,callback,filetypes,no_recursive);

function callback(err,data){
  console.log(err,data)
}

![alt tag](http://dmtmix.com/dnetapi/getImage/color/00000000/get-folders-recursive-async.webp)
