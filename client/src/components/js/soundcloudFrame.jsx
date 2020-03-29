import React from "react";
import "../styles/soundcloudFrame.scss";

function SoundcloudFrame(props) {
  return (
    <iframe
      width="100%"
      height="166"
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={props.source}
    ></iframe>
  );
}

export default SoundcloudFrame;
