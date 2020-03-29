import React from "react";
import SoundcloudFrame from "./soundcloudFrame";
import "../styles/multiShareSoundcloud.scss";

export default class MultiShareSoundcloud extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="soundcloud-sharing">
        {this.props.accounts.map((elem, index) => (
          <div key={index}>
            <h4>{elem.title}</h4>
            <SoundcloudFrame source={elem.link} />
          </div>
        ))}
      </section>
    );
  }
}
