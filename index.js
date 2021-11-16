const inquirer = require("inquirer");
require("dotenv").config();
const {
  addSplashIcon,
  downloadimage,
  replaceicon,
  replacesplashscreen,
  signedApk,
  generateApk,
  assembleGradle,
} = require("./utilities/functions");

const {
  readFile,
  changeDataAndUpdateFile,
  takeColors,
} = require("./utilities/updateapptheam");

const questions = [
  {
    type: "list",
    name: "question",
    message: "What do you want to do?",
    choices: [
      "Add a splash screen and icon",
      "Generate apk",
      "change app color",
    ],
  },
];

inquirer
  .prompt(questions)
  .then((res) => {
    if (res.question == "Add a splash screen and icon") {
      addSplashScreenAndIcon();
    } else if (res.question == "Generate apk") {
      generateapk();
    } else if (res.question == "change app color") {
      changeAppColor();
    }
  })
  .catch((err) => {
    console.log(err);
  });

function addSplashScreenAndIcon() {
  downloadimage(process.env.splashUrl)
    .then((res) => {
      downloadimage(process.env.iconUrl)
        .then((res) => {
          replaceicon()
            .then((res) => {
              console.log(res);
              replacesplashscreen()
                .then((res) => {
                  console.log(res);
                  addSplashIcon()
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function generateapk() {
  assembleGradle()
    .then((res) => {
      console.log(res);
      signedApk()
        .then((res) => {
          console.log(res);
          generateApk()
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

// /--.*primary-contrast:.*;/,
// /--.*secondary-contrast:.*;/,
// /--.*tertiary-contrast:.*;/,

// change the app primary, secondary ,tartinary color
function changeAppColor() {
  readFile()
    .then((res) => {
      takeColors()
        .then((color) => {
          // console.log(color);
          let reg = [
            /--.*primary:.*;/,
            /--.*primary-shade:.*;/,
            /--.*primary-tint:.*;/,
            /--.*primary-copy:.*;/,
            /--.*primary-copy-shade:.*;/,
            /--.*primary-copy-tint:.*;/,
            /--.*secondary:.*;/,
            /--.*secondary-shade:.*;/,
            /--.*secondary-tint:.*;/,
            /--.*tertiary:.*;/,
            /--.*tertiary-shade:.*;/,
            /--.*tertiary-tint:.*;/,
          ];

          //  '--ion-color-primary-contrast: #6AF107;',
          //  '--ion-color-secondary-contrast: #6AF107;',
          //  '--ion-color-tertiary-contrast: #6AF107;',

          // css properties
          let properties = [
           ` --ion-color-primary:${color.Primary};`,
            `--ion-color-primary-shade:${color.Primary};`,
            `--ion-color-primary-tint: ${color.Primary};`,
            ` --ion-color-primary-copy:${color.Primary};`,
            `--ion-color-primary-copy-shade:${color.Primary};`,
            `--ion-color-primary-copy-tint: ${color.Primary};`,
            `--ion-color-secondary:${color.Secondary};`,
            `--ion-color-secondary-shade: ${color.Secondary};`,
            `--ion-color-secondary-tint: ${color.Secondary};`,
            `--ion-color-tertiary: ${color.Tertiary};`,
            `--ion-color-tertiary-shade: ${color.Tertiary};`,
            `--ion-color-tertiary-tint: ${color.Tertiary};`,
          ];
          for (let i = 0; i < reg.length; i++) {
            changeDataAndUpdateFile(reg[i], properties[i])
              .then((res) => {
                // console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}
