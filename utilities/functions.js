const fs = require('fs');
const https= require('https');
const {exec} = require('child_process');

 function addSplashIcon(){ 
     return new Promise((resolve,reject) =>{
        exec(`cd ${process.env.projectPath} && cordova-res android --skip-config --copy`, (err,result)=> {
            if(err){
                reject(err)
            }
            else{
                resolve("splash screen and icon added");
            }
        }) 
     })
}

function replacesplashscreen(){
    return new Promise((resolve,reject) => {
        exec(`replace ${process.env.splashScreenPath} ${process.env.projectPath}\\resources`, (err,result)=> {
            if(err){
                reject(err);
            }
            else{
                resolve("splash screen replaced");
            }
        })
    })
}

function replaceicon(){
    return new Promise((resolve,reject) => {
            exec(`replace ${process.env.iconPath} ${process.env.projectPath}\\resources && replace ${process.env.iconForeground} ${process.env.projectPath}\\resources\\android && replace ${process.env.iconBackground} ${process.env.projectPath}\\resources\\android`, (err,result)=> {
                if(err){
                    reject(err);
                }
                else{
                    resolve("icon replaced")
                }
            })
        }).catch(err => {
            console.log(err);
        })      
}

function downloadimage(url){
    return new Promise((resolve,reject) => {
        let path = './downloads/'+Date.now() + '.png';
        // let path = './downloads/'+filename + '.png';
        var localpath = fs.createWriteStream(path);
        var request = https.get(url, (response)=>{
            response.pipe(localpath);
            resolve('Image Downloded');
        })
    })
}


function assembleGradle(){
    console.log("Gradle Assembling...........");
    return new Promise((resolve,reject) => {
        exec(`cd ${process.env.projectPath} && cd android && .\\gradlew assembleRelease`, (err,result)=> {
            if(err){
                reject(err);
            }
            else{
                resolve("Working....");
            }
        }) 
    })
}

function signedApk(){
    console.log("signing apk...................");
    console.log(process.env.keyStorePath);
    return new Promise((resolve,reject) => {
        exec(`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ${process.env.keyStorePath} -storepass ${process.env.keyStorePassword} ${process.env.unsignedApkPath} ${process.env.aliasName}`, (err,result)=> {
            if(err){
                reject(err);
            }
            else{
                resolve("Apk Signed....\n..................");
            }
        }) 
    })
}

function generateApk(){
    return new Promise((resolve,reject) => {
        exec(`cd ${process.env.projectPath} && zipalign -v 4 ${process.env.unsignedApkPath} ${process.env.apkPath}\\${process.env.apkName}`,(err,result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(`apk geneeated at ${process.env.apkPath}`);
            }
        })
    })
}


module.exports = {
    addSplashIcon,
    downloadimage,
    replaceicon,
    replacesplashscreen,
    assembleGradle,
    signedApk,
    generateApk,
}