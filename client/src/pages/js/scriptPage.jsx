import React from "react";
import SoundcloudFrame from "../../components/js/soundcloudFrame";
import ScriptPageIntro from "../../components/js/scriptPageIntro";
import InstagramFrame from "../../components/js/instagramFrame";
import SubmissionFormApp from "../../components/js/submissionFormApp";
import { useParams } from "react-router-dom";
import "../styles/scriptPage.scss";

function Auxilliary(props) {
  const { scriptKey } = useParams();
  console.log(props.publicationData);
  if (props.publicationData.length > 0) {
    const data = props.publicationData[scriptKey];
    var textAsList = data.text.split("§");
    const paragraphNumber = textAsList.length;
    const text = textAsList.map((elem, index) => {
      if (index === Math.floor(paragraphNumber / 2)) {
        return (
          <div className="script">
            <InstagramFrame link={data.instagram} />
            <p>{elem}</p>
          </div>
        );
      }
      return <p>{elem}</p>;
    });

    return (
      <div className="script-page">
        <ScriptPageIntro
          title={data.title}
          text={data.text}
          withAudio={data.withAudio}
          audioName={data.audio}
          pdfName={data.pdf}
        />
        {data.withAudio === "true" ? (
          <div className="audio">
            <p>
              Audio par : <strong>{data.audioAuthor}</strong>
            </p>
            <SoundcloudFrame source={data.soundcloud} />
          </div>
        ) : (
          <SubmissionFormApp audio={true} />
        )}

        <div className="script-info">
          <p>
            <strong>{data.author}</strong>
          </p>
          <p>{data.date}</p>
          <p>{`Mots : ${data.words}`}</p>
        </div>
        <div className="script">{text}</div>
      </div>
    );
  } else {
    return <div className="script-page"></div>;
  }
}

export default class ScriptPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Auxilliary
        publicationData={this.props.publicationData}
        handleFileDownload={this.handleFileDownload}
      />
    );
  }
}
