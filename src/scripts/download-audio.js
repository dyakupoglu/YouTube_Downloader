import { createWriteStream } from "fs";
import ytdl from "ytdl-core";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import fluentFfmpeg from "fluent-ffmpeg";
import { YOUTUBE_URL } from "../utils/url-utils.js";
fluentFfmpeg.setFfmpegPath(ffmpegPath);

const videoUrl = YOUTUBE_URL;
const audioPath = "public/audio/";
const audioQuality = "highestaudio";

// Download the audio stream
async function downloadAudio() {
  try {
    const audioStream = ytdl(videoUrl, { quality: audioQuality });

    // Get video title from URL info
    const audioInfo = await ytdl.getInfo(videoUrl);
    const audioTitle = audioInfo.videoDetails.title.replace(/[^\w\s]/gi, ""); // Remove special characters

    // Create audio file stream
    const audioFile = createWriteStream(`${audioPath}${audioTitle}.mp3`);

    // Download audio stream
    audioStream.pipe(audioFile);
  } catch (error) {
    console.error("Error:", error);
  }
}

downloadAudio();
