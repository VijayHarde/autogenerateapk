const fs = require("fs");
const inquirer = require('inquirer');

let fileData;

const colors = [
    {
      type: "input",
      name: "Primary",
      message:"Primary color code?"
    },
    {
      type: "input",
      name: "Secondary",
      message:"Secondary color code?"
    },
    {
      type: "input",
      name: "Tertiary",
      message:"Tertiary color code?"
    }
  ];


function readFile(){
    return new Promise((resolve , reject) => {
        fs.readFile(process.env.variableCssFilePath , (err , data) => {
            if(err) {
                reject(err);
            }
            fileData = data.toString();
            resolve(data);
        });
        
    })
}

function changeDataAndUpdateFile(reg,property){
  return  new Promise((resolve , reject) => {
        fileData = fileData.replace(reg, property);
        fs.writeFile(process.env.variableCssFilePath , fileData, (err, file) => {
          if (err) {
            reject(err);
            return;
          }
           resolve("File Updated");
        });
    })
}

 function takeColors() {
     return new Promise((resolve, reject) => {
        inquirer.prompt(colors).then(answers => {
            resolve(answers);
          })
          .catch(err => {
              reject(err);
          })
     })
}
module.exports = {
    readFile,
    changeDataAndUpdateFile,
    takeColors
}