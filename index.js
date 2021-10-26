const inquirer = require('inquirer');
require('dotenv').config();
const {
  addSplashIcon,
  downloadimage,
  replaceicon,
  replacesplashscreen,
  signedApk,
  generateApk,
  assembleGradle,
} = require("./utilities/functions");

const questions = [
  {
      type:'list',
      name:'question',
      message:"What do you want to do?",
      choices:[
        "Add a splash screen and icon",
        "Generate apk"
      ]
  }
];

inquirer.prompt(questions).then(res => {
  if(res.question == "Add a splash screen and icon"){
    addSplashScreenAndIcon()
  }
  else if(res.question == "Generate apk"){
    generateapk();
  }
})
.catch(err => {
  console.log(err);
})

function addSplashScreenAndIcon(){
    downloadimage(process.env.splashUrl).then(res => {
        downloadimage(process.env.iconUrl).then(res => {
          replaceicon().then((res)=>{
            console.log(res);
            replacesplashscreen().then(res => {
              console.log(res);
              addSplashIcon().then(res => {
                console.log(res);
              }).catch(err =>{console.log(err)});
            }).catch(err =>{console.log(err)});
          }).catch(err =>{console.log(err)});
        }).catch(err =>{console.log(err)});
      }).catch(err =>{console.log(err)});
}

function generateapk(){
    assembleGradle().then(res =>{
      console.log(res);
      signedApk().then(res => {
        console.log(res);
        generateApk().then(res =>{
          console.log(res);
        }).catch(err => {console.log(err)});
      }).catch(err => {console.log(err)});
    }).catch(err => {console.log(err)});
}