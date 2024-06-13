import React, { useState, useRef, useEffect } from "react";
import "./Main.css";

const Main = () => {
  const [fakeDuration, setFakeDuration] = useState(600);
  const [isPlaying, setIsPlaying] = useState(false);
  // eslint-disable-next-line
  const [currentTime, setCurrentTime] = useState(0);
  const [timeDisplay, setTimeDisplay] = useState("10:00");
  const songRef = useRef(null);
  const videoRef = useRef(null);
  const playRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const song = songRef.current;
    const video = videoRef.current;
    const play = playRef.current;
    const circle = circleRef.current;

    const updateTimeDisplay = () => {
      const currentTime = song.currentTime;
      const elapsed = fakeDuration - currentTime;
      const seconds = Math.floor(elapsed % 60);
      const minutes = Math.floor(elapsed / 60);
      setTimeDisplay(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);

      // Calculate strokeDasharray and strokeDashoffset
      const circumference = 2 * Math.PI * circle.r.baseVal.value;
      const progress = (currentTime / fakeDuration) * circumference;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = circumference - progress;

      if (currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        setIsPlaying(false);
        play.src = "assets/svg/play.svg";
        video.pause();
      }
    };

    const interval = setInterval(updateTimeDisplay, 1000);

    return () => clearInterval(interval);
  }, [fakeDuration]);

  const handleSoundClick = (soundSrc, videoSrc) => {
    const song = songRef.current;
    const video = videoRef.current;
    song.src = soundSrc;
    video.src = videoSrc;
    if (isPlaying) {
      handlePlayPause(); // Pause the current playing sound
    }
  };

  const handlePlayPause = () => {
    const song = songRef.current;
    const play = playRef.current;
    const video = videoRef.current;
    if (song.paused) {
      song.play();
      video.play();
      setIsPlaying(true);
      play.src = "assets/svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      setIsPlaying(false);
      play.src = "assets/svg/play.svg";
    }
  };

  const handleReplay = () => {
    const song = songRef.current;
    song.currentTime = 0;
    if (isPlaying) {
      song.play();
    }
  };

  const handleTimeSelect = (time) => {
    setFakeDuration(time);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    setTimeDisplay(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
  };

  return (
    <main role="main" className="pt-0">
      <div className="app">
        <div className="vid-container">
          <video ref={videoRef} loop>
            <source src="assets/video/rain.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="time-select">
          <button onClick={() => handleTimeSelect(120)} data-time="120">
            2 Minutes
          </button>
          <button
            onClick={() => handleTimeSelect(300)}
            data-time="300"
            className="medium-mins"
          >
            5 Minutes
          </button>
          <button
            onClick={() => handleTimeSelect(600)}
            data-time="600"
            className="long-mins"
          >
            10 Minutes
          </button>
        </div>
        <div className="player-container">
          <audio ref={songRef} className="song">
            <source src="assets/sounds/rain.mp3" />
          </audio>
          <img
            ref={playRef}
            src="assets/svg/play.svg"
            className="play"
            alt="play"
            onClick={handlePlayPause}
          />
          <svg
            className="track-outline"
            width="453"
            height="453"
            viewBox="0 0 453 453"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              ref={circleRef}
              cx="226.5"
              cy="226.5"
              r="216.5"
              stroke="white"
              strokeWidth="20"
              fill="none"
            />
          </svg>
          <img
            src="assets/svg/replay.svg"
            className="replay position-absolute bottom-0"
            alt="img"
            onClick={handleReplay}
          />
          <h3 className="time-display">{timeDisplay}</h3>
        </div>
        <div className="sound-picker">
          <button
            onClick={() =>
              handleSoundClick(
                "assets/sounds/rain.mp3",
                "assets/video/rain.mp4"
              )
            }
            data-sound="assets/sounds/rain.mp3"
            data-video="assets/video/rain.mp4"
          >
            <img src="assets/svg/rain.svg" alt="" />
          </button>
          <button
            onClick={() =>
              handleSoundClick(
                "assets/sounds/beach.mp3",
                "assets/video/beach.mp4"
              )
            }
            data-sound="assets/sounds/beach.mp3"
            data-video="assets/video/beach.mp4"
          >
            <img src="assets/svg/beach.svg" alt="" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Main;