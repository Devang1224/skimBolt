'use client';

import React, { useRef, useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";

const DemoVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = async () => {
    if (!videoRef.current) {
      return;
    }
    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } catch {
      // ignore autoplay rejection; user can try again
    }
  };

  return (
    <section className=" px-6 md:px-10 lg:px-16 py-12 md:py-16" id="demo-video">
    <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center p-5">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold text-[#9d6aef] bg-[#ede9fe]">
            <BsStars className="w-4 h-4 mr-2" />
            SEE IT IN ACTION
          </span>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1e293b] text-center">
           Watch How It Works {" "}
          </h2>
          <p className="mt-4 text-[#64748b] text-lg text-center max-w-xl">
            See how Skimbolt transform lengthy articles into clear, concise summaries in seconds.
          </p>
        </div>
      <div className=" mt-10 relative rounded-2xl  bg-white/70 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.7)] backdrop-blur">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-sky-200/50 via-transparent to-indigo-200/50" />
        <div className="relative rounded-2xl overflow-hidden  bg-black/90">
          <video
            className="w-full h-full object-contain aspect-video"
            ref={videoRef}
            muted
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onClick={handleToggle}
          >
            <source src="/videos/projectVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!isPlaying && (
            <button
              type="button"
              onClick={handleToggle}
              className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center gap-2 text-white"
              aria-label="Play demo video"
            >
              <span className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              <span className="relative flex flex-col items-center justify-center ">
                <span className="flex items-center justify-center w-18 h-18 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500">
                  <FaPlay className="text-white text-2xl translate-x-0.5 " />
                </span>
                <span className="text-md font-medium text-black/60 mt-2 ">Click to play demo video</span>
                <span className="text-xs text-black/60">1 min · no sound required</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  </section>

  )
}

export default DemoVideo
