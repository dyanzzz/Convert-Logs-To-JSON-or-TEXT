const fs = require('fs');

const convert = (filePath) => {
  let text = fs.readFileSync(filePath,'utf8')
  const array = text.split("\n")
  
  var dataArray = [];
  for(var i=0; i<array.length; i++){
    if(array[i] == ''){continue}
    let tempArray = []
    tempArray = array[i].split(",");
    dataArray.push(tempArray)
  };
  
  
  const newArr = [];
  dataArray.forEach((e1) =>{
    
    var tempjson = {};
    e1.forEach((e2) => {
      const split = e2.split('[')

      let date;
      let core;
      let pid;
      let tid;
      let message;

      if (split[1] != undefined) {
        date = split[1].slice(0, -2);
        core = split[2].slice(0, -2);
        pid = split[3].slice(0, -2).split(":")[0];
        tid = split[3].slice(0, -2).split(":")[1];
        message = split[3].split(']')[1].slice(0, -2)
      } else {
        date = null
        core = null
        pid = null
        tid = null
        message = e1[0]
      }

      tempjson['date'] = date
      tempjson['core'] = core
      tempjson['pid'] = pid
      tempjson['tid'] = tid
      tempjson['message'] = message
    })
    newArr.push(tempjson);
  });

  return newArr
}

module.exports = {
  convert
}