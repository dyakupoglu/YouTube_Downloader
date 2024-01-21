import { createWriteStream } from "fs";
import ytdl, { getInfo } from "ytdl-core";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import { setFfmpegPath } from "fluent-ffmpeg";
import commonUrl from "./common_url.js";
setFfmpegPath(ffmpegPath);

const url = commonUrl;
const audioPath = "./audio/audio.mp3";
const audioQuality = "highestaudio";

// Define a function to download and merge the video and audio streams
async function downloadAudio() {
  try {
    const info = await getInfo(url);
    const audioStream = ytdl(url, { quality: audioQuality });

    // Create audio file stream
    const audioFile = createWriteStream(audioPath);

    // Download audio stream
    audioStream.pipe(audioFile);

    // Wait for the stream to finish downloading
    await Promise.all([new Promise((resolve) => audioFile.on("finish", resolve))]);
  } catch (error) {
    console.error("Error:", error);
  }
}

downloadAudio();
