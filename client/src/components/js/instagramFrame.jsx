import React from "react";
import InstagramEmbed from "react-instagram-embed";
import "../styles/instagramFrame.scss";

function InstagramFrame(props) {
  return (
    <InstagramEmbed
      url={props.link}
      maxWidth={320}
      hideCaption={false}
      containerTagName="div"
      protocol=""
      injectScript
      onLoading={() => {
        console.log("loading");
      }}
      onSuccess={() => {}}
      onAfterRender={() => {}}
      onFailure={() => {
        console.log("failure");
      }}
    />
  );
}
export default InstagramFrame;
