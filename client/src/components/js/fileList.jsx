import React from "react";
import "../styles/fileList.scss";

// Rendering individual images
const File = ({ file }) => {
  return (
    <div>
      <p>
        <strong className="earousal">{file}</strong>
      </p>
    </div>
  );
};

// ImageList Component
function fileList(props) {
  // render each image by calling Image component
  var filesToDisplay = props.filenames.map((file, index) => (
    <File file={file} key={`${file}-file`} />
  ));
  // Return the list of files
  return <section className="filelist">{filesToDisplay}</section>;
}

export default fileList;
