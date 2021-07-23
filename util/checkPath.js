const fs = require('fs');

async function checkPath(path) {
  const exists = !!(await fs.promises.stat(path).catch(() => null))
       if(!exists) {
         fs.mkdir(path, function(err) {
           if(err) {
             console.log('Error in folder creation');
           }  
         })
       }
}

module.exports = checkPath