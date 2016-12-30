var path = require('path');
var fs = require('fs');

//*****************************************************************************************************
//non-blocking recursive list of files, with file extension matching - node.js
//
function getFoldersRecursiveAsync(folder,callback,filetypes, no_recursive){
	
	var thiscallback = callback;

  var filetype_regexp = [];
  filetypes = filetypes || [];
  for (var i=0;i<filetypes.length;i++){
    filetype_regexp.push(new RegExp(filetypes[i],'i'))
  }


  fs.readdir(folder,function(err,fold){
  	
  	var data = {files:[], folders:[]};

			if (err){
        thiscallback(err)
        return
      } else if (fold.length>0){
      	doList()
      } else {
      	thiscallback(null, data)
      	return
      }


      function doList(){
      	if (fold.length==0){
      		thiscallback(null,data)
      		return
      	}
      	var this_item = fold.shift();
        var this_path = path.resolve(folder + path.sep + this_item);

        fs.lstat(this_path,function(err,stats){
          if (err){
          	var err_path={};
          	err_path[this_path] = null;
          	data.folders.push(err_path)
          	doList()
          	return
          } else {
            if (stats.isDirectory()){
            	//data.folders.push(this_item)
            	if (no_recursive === true){
            		data.folders.push(this_item)
            	} else {
	            	getFoldersRecursiveAsync(this_path, function(err,_data){
	            		var fold_obj = {}
	            		fold_obj[this_item] = _data
	            		data.folders.push(fold_obj)
	            		doList()
	            	},filetypes)
	            	return
            	}
            } else {
            	if (filetypes.length == 0 || (filetypes.length > 0 && fileMatch(this_path)) ){
            		data.files.push(this_item)
            	}
            }
          }
          doList()
      	})
      }

  })


  function fileMatch(file){
    if (filetype_regexp.length == 0){return true}
    for (var i=0;i<filetype_regexp.length;i++){
      if (file.match(filetype_regexp[i]) !== null) {
        return true
      }
    }
    return false
  }

}

module.exports = getFoldersRecursiveAsync;
