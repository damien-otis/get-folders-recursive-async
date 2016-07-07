# get-folders-recursive-async


Usage:

var getFoldersRecursiveAsync = require('get-folders-recursive-async');

var folder = "~/";

var filetypes = [".js$",".css$"];

getFilesRecursiveAsync(folder,callback,filetypes,no_recursive);

function callback(err,data){
  console.log(err,data)
}
