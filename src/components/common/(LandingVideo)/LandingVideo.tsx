"use client";

import styles from "./LandingVideo.module.css";

type LandingVideoProps = {
  src: string;
};

const LandingVideo = ({ src }: LandingVideoProps) => {
  return (
    <div className={styles.landingVideoContainer}>
      <video
        className={styles.landingVideo}
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
};

export default LandingVideo;