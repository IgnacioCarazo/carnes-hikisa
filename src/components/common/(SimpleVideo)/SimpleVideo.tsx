"use client";

import styles from "./SimpleVideo.module.css";

type SimpleVideoProps = {
  src: string;
};

const SimpleVideo = ({ src }: SimpleVideoProps) => {
  return (
    <div className={styles.simpleVideoContainer}>
      <video
        className={styles.simpleVideo}
        src={src}
        controls
        playsInline
      />
    </div>
  );
};

export default SimpleVideo;