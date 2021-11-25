const fs = require('fs');
const https= require('https');
const {exec} = require('child_process');

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
    assembleGradle,
    signedApk,
    generateApk
}