import { createWriteStream } from "fs";
import ytdl from "ytdl-core";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import fluentFfmpeg from "fluent-ffmpeg";
import { YOUTUBE_URL } from "../utils/url-utils.js";
fluentFfmpeg.setFfmpegPath(ffmpegPath);

const videoUrl = YOUTUBE_URL;
const audioPath = "public/audio/audio.mp3";
const audioQuality = "highestaudio";

// Download the audio stream
async function downloadAudio() {
  try {
    const audioStream = ytdl(videoUrl, { quality: audioQuality });

    // Create audio file stream
    const audioFile = createWriteStream(audioPath);

    // Download audio stream
    audioStream.pipe(audioFile);

    // Wait for the audio stream to finish downloading
    await Promise.all([new Promise((resolve) => audioFile.on("finish", resolve))]);
  } catch (error) {
    console.error("Error:", error);
  }
}

downloadAudio();
