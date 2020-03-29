import React from "react";
import { useDropzone } from "react-dropzone";
import "../styles/dropzone.scss";

const Dropzone = ({ onDrop, accept, onChange }) => {
  // Initializing useDropzone hooks with options
  var { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    onChange
  });

  const getClassName = (className, isActive) => {
    if (!isActive) {
      return className;
    } else {
      return `${className} ${className}-active`;
    }
  };

  const whenNotActive = (
    <div className="text-center">
      <p className="dropzone-content">
        Dépose tes scripts, tes audios et tes illustrations ici <span>📁</span>
      </p>
    </div>
  );

  const whenActive = (
    <div className="text-center">
      <p className="dropzone-content">On lache tout !</p>
    </div>
  );

  return (
    <div className={getClassName("dropzone", isDragActive)} {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      {isDragActive ? whenActive : whenNotActive}
    </div>
  );
};

export default Dropzone;
