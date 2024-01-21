const fs = require("fs");
const ytdl = require("ytdl-core");
const getInfo = require("ytdl-core");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg");
const fluentFfmpeg = require("fluent-ffmpeg");
import {YOUTUBE_URL as URL} from "../utils/url-utils.js";
fluentFfmpeg.setFfmpegPath(ffmpegPath);
console.log(URL);
const url = URL;
const audioPath = "../public/audio/audio.mp4";
const audioQuality = "highestaudio";

// Download the audio stream
async function downloadAudio() {
  try {
    const info = await getInfo(url);
    const audioStream = ytdl(url, { quality: audioQuality });

    // Create audio file stream
    const audioFile = fs.createWriteStream(audioPath);

    // Download audio stream
    audioStream.pipe(audioFile);

    // Wait for the audio stream to finish downloading
    await Promise.all([new Promise((resolve) => audioFile.on("finish", resolve))]);
  } catch (error) {
    console.error("Error:", error);
  }
}

downloadAudio();
