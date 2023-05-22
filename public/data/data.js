const fs = require("fs");
const readData = function () {
    let dataFile = ''
 fs.readFile("public/data/data.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
     dataFile = data
  });

  return dataFile
};

const writeData = function (data) {
  fs.writeFile("public/data/data.txt", data, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("File has been written.");
    return true
  });
};
module.exports = {readData , writeData};
