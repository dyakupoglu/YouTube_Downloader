const fs = require("fs");
const os = require("os");
const path = require("path");

function createPublicFolder() {
  // Create an Temp Folder
  const tempFolder = "./public";

  if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder);
    console.log("Audio folder created.");
  } else {
    console.log("Audio folder already exists.");
  }
}

function createVideoFolders() {
  // Create a Video Folder
  const videoFolder = "./public/video";

  if (!fs.existsSync(videoFolder)) {
    fs.mkdirSync(videoFolder);
    console.log("Video folder created.");
  } else {
    console.log("Video folder already exists.");
  }
}

function createAudioFolder() {
  // Create an Audio Folder
  const audioFolder = "./public/audio";

  if (!fs.existsSync(audioFolder)) {
    fs.mkdirSync(audioFolder);
    console.log("Audio folder created.");
  } else {
    console.log("Audio folder already exists.");
  }
}

function createTempFolder() {
  // Create an Temp Folder
  const tempFolder = "./public/temp";

  if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder);
    console.log("Audio folder created.");
  } else {
    console.log("Audio folder already exists.");
  }
}

return createPublicFolder(), createVideoFolders(), createAudioFolder(), createTempFolder();
