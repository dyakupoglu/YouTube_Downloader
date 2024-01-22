import { createWriteStream, unlinkSync } from "fs";
import ytdl from "ytdl-core";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import ffmpeg, { setFfmpegPath } from "fluent-ffmpeg";
import { YOUTUBE_URL } from "../utils/url-utils.js";
setFfmpegPath(ffmpegPath);

const url = YOUTUBE_URL;
const videoPath = "public/temp/video.mp4";
const audioPath = "public/temp/audio.mp3";
const finalVideoPath = "public/video/video.mp4";
const videoQuality = "highestvideo";
const audioQuality = "highestaudio";

// Define a function to download and merge the video and audio streams
async function downloadVideo() {
  try {
    const videoStream = ytdl(url, { quality: videoQuality });
    const audioStream = ytdl(url, { quality: audioQuality });

    // Create video and audio file streams
    const videoFile = createWriteStream(videoPath);
    const audioFile = createWriteStream(audioPath);

    // Download video and audio streams
    videoStream.pipe(videoFile);
    audioStream.pipe(audioFile);

    // Wait for both streams to finish downloading
    await Promise.all([
      new Promise((resolve) => videoFile.on("finish", resolve)),
      new Promise((resolve) => audioFile.on("finish", resolve)),
    ]);

    // Merge video and audio using FFmpeg
    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .output(finalVideoPath)
      .on("end", () => {
        console.log("Video download and merge complete!");

        // Remove temporary files
        unlinkSync(videoPath);
        unlinkSync(audioPath);
      })
      .on("error", (err) => {
        console.error("Error:", err);
      })
      .run();
  } catch (error) {
    console.error("Error:", error);
  }
}

downloadVideo();
