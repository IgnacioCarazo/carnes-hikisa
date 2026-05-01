"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./LandingVideo.module.css";

type LandingVideoProps = {
  src: string;
  poster?: string;
};

const LandingVideo = ({ src, poster }: LandingVideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  return (
    <div className={styles.landingVideoContainer}>
      <video
        ref={videoRef}
        className={`${styles.landingVideo} ${
          loaded ? styles.landingVideoLoaded : ""
        }`}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlayThrough={() => setLoaded(true)}
      />
    </div>
  );
};

export default LandingVideo;
